using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BC = BCrypt.Net.BCrypt;

namespace ProjectBookShop.Service
{
    public class UserServiceImpl : IUserService
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;

        public UserServiceImpl(ApplicationDbContext context, IMapper mapper, IConfiguration configuration)
        {
            this.context = context;
            this.mapper = mapper;
            this._configuration = configuration;
        }
        public async Task<bool> SignUpUser(RegisterUserDTO registerUserDTO)
        {
            var user = await context.Customer.FirstOrDefaultAsync(x => x.Email == registerUserDTO.Email);
            if (user == null)
            {
                var customer = mapper.Map<UserInfo>(registerUserDTO);
                customer.Password = BC.HashPassword(registerUserDTO.Password);
                customer.DateOfCreated = DateTime.Now.ToString();

                customer.DateOfBirth = DateTime.Now.Year.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Day.ToString(); 
                AddRole(customer);
                await context.SaveChangesAsync();
                var result = customer;
                return true;
            }
            return false;
        }
        public void AddRole(UserInfo customer)
        {
            UserRole userRole = new UserRole();
            userRole.Role_Name = "User";
            userRole.UserInfoId = customer.Id;
            userRole.UserInfo = customer;
            customer.UserRoles.Add(userRole);
            context.Add(userRole);
            context.Add(customer);
            
        }

        public async Task<LoginSuccessDTO> LoginUser(UserLoginDTO userLoginDTO)
        {
            var user = await context.Customer.FirstOrDefaultAsync(x => x.Email == userLoginDTO.Email);
            if (user == null)
            {
                return null;
            }
            else
            {
                if (BC.Verify(userLoginDTO.Password, user.Password))
                {
                    return await BuildToken(user);
                }
                return null;
            }
        }
        private async Task<LoginSuccessDTO> BuildToken(UserInfo userInfo)
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
                    new Claim(ClaimTypes.Role, "User")
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

        public async Task<bool> UpdatePassword(UpdatePasswordDTO updatePasswordDTO,UserInfo userInfo)
        {
            if (BC.Verify(updatePasswordDTO.OldPassword, userInfo.Password))
            {
                userInfo.Password = BC.HashPassword(updatePasswordDTO.NewPassword);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> UpdateInfoUser(UserInfoUpdateDTO userInfoUpdateDTO, UserInfo userInfo)
        {
            if (userInfo != null && userInfo.Id == userInfoUpdateDTO.Id)
            {
                userInfo.DateOfBirth = userInfoUpdateDTO.DateOfBirth;
                userInfo.FirstName = userInfoUpdateDTO.FirstName;
                userInfo.LastName = userInfoUpdateDTO.LastName;
                userInfo.Gender = userInfoUpdateDTO.Gender;
                await context.SaveChangesAsync();
                var data = mapper.Map<UserInfoDTO>(userInfo);
                return true;
            }
            else
                return false;
        }

        public async Task<LoginSuccessDTO> SignUpUserForExternalAccountGoogle(ExternalGoogleLoginDTO externalGoogleLoginDTO)
        {
            UserInfo userInfo = new UserInfo();
            userInfo.FirstName = externalGoogleLoginDTO.GivenName;
            userInfo.LastName = externalGoogleLoginDTO.FamilyName;
            userInfo.Email = externalGoogleLoginDTO.Email;
            userInfo.UrlImageAvatar = externalGoogleLoginDTO.Picture;
            userInfo.ProviderName = externalGoogleLoginDTO.ProviderName;
            userInfo.DateOfBirth= DateTime.Now.Year.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Day.ToString();
            userInfo.Password = Guid.NewGuid().ToString();
            userInfo.DateOfCreated = DateTime.Now.ToString();
            AddRole(userInfo);
            await context.SaveChangesAsync();
            return await BuildToken(userInfo);
        }

        public async Task<LoginSuccessDTO> LoginForExternalAccountGoogle(ExternalGoogleLoginDTO externalGoogleLoginDTO)
        {
            var userInfo = await context.Customer.FirstAsync(x => x.Email.Equals(externalGoogleLoginDTO.Email));
            if(userInfo!=null)
            {
                if(userInfo.Status==true)
                {
                    return await BuildToken(userInfo);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return await SignUpUserForExternalAccountGoogle(externalGoogleLoginDTO);
            }
        }

        public async Task<LoginSuccessDTO> LoginForExternamAccoutFacebook(ExternalLoginFacebookDTO externalLoginFacebookDTO)
        {
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => x.Email.Equals(externalLoginFacebookDTO.Email));
            if(userInfo!=null)
            {
                if(userInfo.Status==true)
                {
                    return await BuildToken(userInfo);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return await SignUpUserForExternalAccountFacebook(externalLoginFacebookDTO);
            }
        }
        public async Task<LoginSuccessDTO> SignUpUserForExternalAccountFacebook(ExternalLoginFacebookDTO externalLoginFacebookDTO)
        {
            UserInfo userInfo = new UserInfo();
            userInfo.FirstName = externalLoginFacebookDTO.FirstName;
            userInfo.LastName = externalLoginFacebookDTO.LastName;
            userInfo.Email = externalLoginFacebookDTO.Email;
            userInfo.UrlImageAvatar = externalLoginFacebookDTO.PhotoUrl;
            userInfo.ProviderName = externalLoginFacebookDTO.Provider;
            userInfo.DateOfBirth = DateTime.Now.Year.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Day.ToString();
            userInfo.DateOfCreated = DateTime.Now.ToString();
            userInfo.Password = Guid.NewGuid().ToString();
            AddRole(userInfo);
            await context.SaveChangesAsync();
            return await BuildToken(userInfo);
        }
    }
}
