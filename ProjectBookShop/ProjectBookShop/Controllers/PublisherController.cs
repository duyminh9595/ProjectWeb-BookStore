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
    [Route("api/publisher")]
    public class PublisherController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public PublisherController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<PublisherReadDTO>>>GetPublishers()
        {
            var publishers = await context.Publisher.AsNoTracking().ToListAsync();
            var publisherReadDTOs = mapper.Map<List<PublisherReadDTO>>(publishers);
            return publisherReadDTOs;
        }
        [HttpGet("{id:int}", Name = "getPublisher")]
        public async Task<ActionResult<PublisherReadDTO>> Get(int id)
        {
            var publisher = await context.Publisher.FirstOrDefaultAsync(x => x.Id == id);
            if (publisher == null)
            {
                return NotFound();
            }
            var publisherReadDTO = mapper.Map<PublisherReadDTO>(publisher);
            return Ok(publisherReadDTO);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Roles ="Admin")]
        public async Task<ActionResult>Post([FromBody]PublisherCreateDTO publisherCreateDTO, [FromHeader] string email)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && userInfo != null)
            {
                var publisher = mapper.Map<Publisher>(publisherCreateDTO);
                context.Add(publisher);
                await context.SaveChangesAsync();
                var publisherReadDTO = mapper.Map<PublisherReadDTO>(publisher);
                return new CreatedAtRouteResult("getPublisher", new { id = publisherReadDTO.Id }, publisherReadDTO);
            }
            return BadRequest();
        }


        [HttpGet("numberbook")]
        public async Task<ActionResult<List<NumberBookByPublisherDTO>>> GetBookByType()
        {
            var publisher = await context.Publisher.ToListAsync();
            var books = await context.Book.Where(x => (x.Status == true)).ToListAsync();
            List<NumberBookByPublisherDTO> numberBookByPublisherDTOs = new List<NumberBookByPublisherDTO>();
            NumberBookByPublisherDTO data;
            foreach (var item in publisher)
            {
                data = new NumberBookByPublisherDTO();
                data.NumberBook = books.Where(x => x.PublisherId == item.Id).Count();
                data.PublisherId = item.Id;
                data.PublisherName = item.Name;
                numberBookByPublisherDTOs.Add(data);
            }
            return numberBookByPublisherDTOs;
        }
    }
}
