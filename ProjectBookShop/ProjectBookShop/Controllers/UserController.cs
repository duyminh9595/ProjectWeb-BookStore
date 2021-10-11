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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using System.IO;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using System.Threading;
using ProjectBookShop.Service;

namespace ProjectBookShop.Controller
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;
        private readonly IUserService userService;
        private readonly IUploadImageToGoogleDrive uploadImageToGoogleDrive;

        public UserController(ApplicationDbContext context,
            IMapper mapper, IConfiguration configuration,IUserService userService,IUploadImageToGoogleDrive uploadImageToGoogleDrive)
        {
            this.context = context;
            this.mapper = mapper;
            this._configuration = configuration;
            this.userService = userService;
            this.uploadImageToGoogleDrive = uploadImageToGoogleDrive;
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult<UserInfoDTO>> GetInfoUser()
        {
            var userInfo = await CheckEmailInToken();
            if (userInfo != null)
            {
                var data = mapper.Map<UserInfoDTO>(userInfo);
                return Ok(data);
            }
            else
                return BadRequest();
        }
        [HttpPut("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult<UserInfoDTO>> GetInfoUser([FromBody]UserInfoUpdateDTO userInfoUpdateDTO)
        {
            var userInfo = await CheckEmailInToken();
            bool check = await userService.UpdateInfoUser(userInfoUpdateDTO, userInfo);
            if (check)
                return Ok();
            else
                return BadRequest();
        }

        [HttpPut("imageaccount")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult<UserInfoDTO>> GetInfoUser([FromForm] IFormFile picture)
        {
            var userInfo = await CheckEmailInToken();
            if (userInfo != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await picture.CopyToAsync(memoryStream);
                    var content = memoryStream;
                    var extension = Path.GetExtension(picture.FileName);
                    string imageId = await uploadImageToGoogleDrive.UploadImageAccountAvatar(content, extension, userInfo.Id, userInfo.Email);
                    userInfo.UrlImageAvatar = "https://drive.google.com/uc?id=" + imageId;
                    await context.SaveChangesAsync();
                    var data = mapper.Map<UserInfoDTO>(userInfo);
                    return Ok(data);

                }                
            }
            else
                return BadRequest();
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginSuccessDTO>>Login([FromBody] UserLoginDTO userLoginDTO)
        {
            LoginSuccessDTO loginSuccessDTO = await userService.LoginUser(userLoginDTO);
            if(loginSuccessDTO==null)
            {
                return BadRequest();
            }
            else
            {
                return loginSuccessDTO;
            }
        }
        [HttpPost("updatepassword")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult<LoginSuccessDTO>> UpdatePassword([FromBody] UpdatePasswordDTO updatePasswordDTO)
        {
            if(updatePasswordDTO.NewPassword.Equals(updatePasswordDTO.OldPassword))
            {
                return BadRequest("Mật khẩu cũ không được trùng mật khẩu mới");
            }
            var userInfo = await CheckEmailInToken();
            if (userInfo == null)
            {
                return NotFound();
            }
            else
            {
                bool checkUpdate = await userService.UpdatePassword(updatePasswordDTO, userInfo);
                if (checkUpdate)
                {
                    return Ok();
                }
                else
                    return BadRequest("Mật Khẩu không trùng khớp");
            }
        }

        private async Task<UserInfo> CheckEmailInToken()
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true && x.Id == Int32.Parse(idInToken)));
            return userInfo;
        }

        [HttpPost("signup")]
        public async Task<ActionResult>SignUp([FromBody] RegisterUserDTO registerUserDTO )
        {
            bool checkRegister =await  userService.SignUpUser(registerUserDTO);
            if (checkRegister)
                return Ok();
            return BadRequest();
        }

        
    }
}
