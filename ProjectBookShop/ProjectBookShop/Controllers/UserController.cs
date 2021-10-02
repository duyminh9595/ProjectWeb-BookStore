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
                var customer = mapper.Map<Customer>(registerUserDTO);
                customer.Password=BC.HashPassword(registerUserDTO.Password);
                customer.DateOfCreated=DateTime.Now.ToString();
                context.Add(customer);
                await context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
        private async Task<LoginSuccessDTO> BuildToken(Customer userInfo)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, userInfo.FirstName+userInfo.LastName),
                new Claim(ClaimTypes.Email, userInfo.Email),
                new Claim("Hông biết âu", "Ok Boy")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expiration,
                signingCredentials: creds);

            return new LoginSuccessDTO()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Email=userInfo.Email
            };

        }
    }
}
