using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using System;
using System.Collections.Generic;
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
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TypeCreateDTO typeCreateDTO)
        {
            var type = mapper.Map<Entities.Type>(typeCreateDTO);
            context.Add(type);
            await context.SaveChangesAsync();
            var typeReadDTO = mapper.Map<TypeReadDTO>(type);
            return new CreatedAtRouteResult("getType", new { id = typeReadDTO.Id }, typeReadDTO);
        }
    }
}
