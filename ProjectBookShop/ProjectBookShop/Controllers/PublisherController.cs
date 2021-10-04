using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
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
        public async Task<ActionResult>Post([FromBody]PublisherCreateDTO publisherCreateDTO)
        {
            var publisher =mapper.Map<Publisher>(publisherCreateDTO);
            context.Add(publisher);
            await context.SaveChangesAsync();
            var publisherReadDTO = mapper.Map<PublisherReadDTO>(publisher);
            return new CreatedAtRouteResult("getPublisher", new { id = publisherReadDTO.Id }, publisherReadDTO);
        }
    }
}
