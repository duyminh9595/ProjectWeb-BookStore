using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using ProjectBookShop.Helpers;
using ProjectBookShop.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/external")]
    public class ExternalController: ControllerBase
    {
        private readonly JwtHandler _jwtHandler;
        private readonly IConfiguration configuration;
        private readonly IMapper mapper;
        private readonly IUserService userService;

        public ExternalController(IConfiguration configuration, IMapper mapper, IUserService userService)
        {
            this.configuration = configuration;
            this.mapper = mapper;
            this.userService = userService;
            this._jwtHandler = new JwtHandler(this.configuration);
            
        }
        [HttpPost("externallogingoogle")]
        public async Task<ActionResult<LoginSuccessDTO>> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
        {
            var payload = await _jwtHandler.VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");
            var data = mapper.Map<ExternalGoogleLoginDTO>(payload);
            var loginSuccessDTO = await userService.LoginForExternalAccountGoogle(data);
            if (loginSuccessDTO == null)
            {
                return BadRequest();
            }
            else
            {
                return loginSuccessDTO;
            }   
        }
        [HttpPost("externalloginfacebook")]
        public async Task<ActionResult<LoginSuccessDTO>>ExternalLoginFacebook([FromBody] ExternalLoginFacebookDTO externalLoginFacebookDTO)
        {
            var data = mapper.Map<UserInfo>(externalLoginFacebookDTO);
            var loginSuccessDTO = await userService.LoginForExternamAccoutFacebook(externalLoginFacebookDTO);
            if(loginSuccessDTO==null)
            {
                return BadRequest();
            }
            return loginSuccessDTO;
        }

    }
}
