using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/type")]
    public class TypeController:ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public TypeController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<TypeReadDTO>>> GetTypes()
        {
            var types = await context.Type.AsNoTracking().ToListAsync();
            var typeReadDTO = mapper.Map<List<TypeReadDTO>>(types);
            return typeReadDTO;
        }
        [HttpGet("{id:int}", Name = "getType")]
        public async Task<ActionResult<TypeReadDTO>> Get(int id)
        {
            var type = await context.Type.FirstOrDefaultAsync(x => x.Id == id);
            if (type == null)
            {
                return NotFound();
            }
            var typeReadDTO = mapper.Map<TypeReadDTO>(type);
            return Ok(typeReadDTO);
        }
        [HttpPost("findname")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<NumberBookByTypeDTO>>> Post([FromBody] NameDTO nameDTO)
        {
            var types = await context.Type.Where(x=>x.Name.Contains(nameDTO.name)).ToListAsync();
            var books = await context.Book.Where(x => x.Status == true).ToListAsync();
            List<NumberBookByTypeDTO> numberBookByTypeDTOs = new List<NumberBookByTypeDTO>();
            NumberBookByTypeDTO data;
            foreach (var type in types)
            {
                data = new NumberBookByTypeDTO();
                data.NumberBook = books.Where(x => x.TypeId == type.Id).Count();
                data.TypeId = type.Id;
                data.TypeName = type.Name;
                numberBookByTypeDTOs.Add(data);
            }
            return numberBookByTypeDTOs;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> Post([FromBody] TypeCreateDTO typeCreateDTO)
        {
            var adminInfo = await CheckEmailInTokenAdmin();
            if (adminInfo != null)
            {
                var type = mapper.Map<Entities.Type>(typeCreateDTO);
                type.AdminUser = adminInfo;
                context.Add(type);
                await context.SaveChangesAsync();
                var typeReadDTO = mapper.Map<TypeReadDTO>(type);
                return new CreatedAtRouteResult("getType", new { id = typeReadDTO.Id }, typeReadDTO);
            }
            else
                return BadRequest();
        }
        [HttpGet("numberbook")]
        public async Task<ActionResult<List<NumberBookByTypeDTO>>>GetBookByType()
        {
            var types = await context.Type.ToListAsync();
            var books = await context.Book.Where(x => x.Status == true).ToListAsync();
            List<NumberBookByTypeDTO> numberBookByTypeDTOs = new List<NumberBookByTypeDTO>();
            NumberBookByTypeDTO data;
            foreach (var type in types)
            {
                data = new NumberBookByTypeDTO();
                data.NumberBook=books.Where(x => x.TypeId == type.Id).Count();
                data.TypeId = type.Id;
                data.TypeName = type.Name;
                numberBookByTypeDTOs.Add(data);
            }
            return numberBookByTypeDTOs;
        }
        [HttpGet("searchbytypeid/{id:int}")]
        public async Task<ActionResult<List<BookReadDTO>>>SearchBookByTypeId(int id)
        {
            var books = await context.Book.Where(x => x.TypeId == id).ToListAsync();
            var data = mapper.Map<List<BookReadDTO>>(books);
            return data;
        }

        private async Task<AdminUser> CheckEmailInTokenAdmin()
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.AdminUser.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true && x.Id == Int32.Parse(idInToken)));
            return userInfo;
        }
    }
}
