using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using BC = BCrypt.Net.BCrypt;
using System.Threading.Tasks;
using System.Security.Claims;
using ProjectBookShop.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

namespace ProjectBookShop.Controller
{
    [ApiController]
    [Route("api/user")]
    public class UserController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext context,
            IMapper mapper, IConfiguration configuration)
        {
            this.context = context;
            this.mapper = mapper;
            this._configuration = configuration;
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginSuccessDTO>>Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var user = await context.Customer.FirstOrDefaultAsync(x => x.Email == userLoginDTO.Email);
            if (user == null )
            {
                return NotFound();
            }
            else
            {
                if(BC.Verify(userLoginDTO.Password,user.Password))
                {

                    return await BuildToken(user);
                }
                return NotFound();
            }    
        }
       
        [HttpPost("signup")]
        public async Task<ActionResult>SignUp([FromBody] RegisterUserDTO registerUserDTO )
        {
            
            var user = await context.Customer.FirstOrDefaultAsync(x => x.Email == registerUserDTO.Email);
            if(user==null)
            {
                var customer = mapper.Map<UserInfo>(registerUserDTO);
                customer.Password=BC.HashPassword(registerUserDTO.Password);
                customer.DateOfCreated=DateTime.Now.ToString();
                AddRole(customer);
                await context.SaveChangesAsync();
                var result = customer;
                return Ok();
            }
            return BadRequest();
        }
        public void AddRole(UserInfo customer)
        {
            UserRole userRole = new UserRole();
            userRole.Role_Name = "Admin";
            userRole.UserInfoId = customer.Id;
            userRole.UserInfo = customer;
            customer.UserRoles.Add(userRole);
            context.Add(userRole);
            context.Add(customer);
        }
        private async Task<LoginSuccessDTO> BuildToken(UserInfo userInfo)
        {

            var roleUsers = await context.UserRole.FirstOrDefaultAsync(x=>x.UserInfoId==userInfo.Id);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            


            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, roleUsers.Id.ToString()),
                    new Claim(ClaimTypes.Role, roleUsers.Role_Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return await Task.FromResult(new LoginSuccessDTO()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Email=userInfo.Email
            });

        }
    }
}
