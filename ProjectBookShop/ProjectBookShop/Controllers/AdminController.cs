using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ProjectBookShop.DTO;
using Microsoft.AspNetCore.Http;
using ProjectBookShop.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController:ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;
        private readonly IAdminService iadminService;
        public AdminController(ApplicationDbContext context,
            IMapper mapper, IConfiguration configuration, IAdminService iadminService)
        {
            this.context = context;
            this.mapper = mapper;
            this._configuration = configuration;
            this.iadminService = iadminService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginSuccessDTO>> LoginAdmin([FromBody] UserLoginDTO userLoginDTO)
        {
            LoginSuccessDTO loginSuccessDTO = await iadminService.AdminUser(userLoginDTO);
            if (loginSuccessDTO == null)
            {
                return BadRequest();
            }
            else
            {
                return loginSuccessDTO;
            }
        }
        [HttpPost("signup")]
        public async Task<ActionResult> SignUp([FromBody] RegisterUserDTO registerUserDTO)
        {
            bool checkRegister = await iadminService.SignUpAdmin(registerUserDTO);
            if (checkRegister)
                return Ok();
            return BadRequest();
        }
    }
}
