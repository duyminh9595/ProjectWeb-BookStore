using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace ProjectBookShop.Service
{
    public class AdminServiceImpl : IAdminService
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;
        public AdminServiceImpl(ApplicationDbContext context, IMapper mapper, IConfiguration configuration)
        {
            this.context = context;
            this.mapper = mapper;
            this._configuration = configuration;
        }
        public async Task<LoginSuccessDTO> AdminUser(UserLoginDTO userLoginDTO)
        {
            var admin = await context.AdminUser.FirstOrDefaultAsync(x => x.Email == userLoginDTO.Email);
            if (admin == null)
            {
                return null;
            }
            else
            {
                if (BC.Verify(userLoginDTO.Password, admin.Password))
                {
                    return await BuildToken(admin);
                }
                return null;
            }
        }

        public async Task<bool> SignUpAdmin(RegisterUserDTO registerUserDTO)
        {
            var user = await context.AdminUser.FirstOrDefaultAsync(x => x.Email == registerUserDTO.Email);
            if (user == null)
            {
                var admin = mapper.Map<AdminUser>(registerUserDTO);
                admin.Password = BC.HashPassword(registerUserDTO.Password);
                admin.DateOfCreated = DateTime.Now.ToString();

                context.Add(admin);
                await context.SaveChangesAsync();
                var result = admin;
                return true;
            }
            return false;
        }

        private async Task<LoginSuccessDTO> BuildToken(AdminUser userInfo)
        {

            var roleUsers = await context.UserRole.Where(x => x.UserInfoId == userInfo.Id).ToListAsync();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));



            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userInfo.Id.ToString()),
                    new Claim(ClaimTypes.Email, userInfo.Email.ToString()),
                    new Claim(ClaimTypes.Role, "Admin")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return await Task.FromResult(new LoginSuccessDTO()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Email = userInfo.Email
            });

        }
    }
}
