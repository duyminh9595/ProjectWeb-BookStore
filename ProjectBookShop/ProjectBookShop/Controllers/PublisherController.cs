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
            var userInfo = await context.AdminUser.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && userInfo != null)
            {
                var publisher = mapper.Map<Publisher>(publisherCreateDTO);
                publisher.AdminUser=userInfo;
                publisher.DateOfCreated = DateTime.Now;
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
        [HttpPost("findname")]
        public async Task<ActionResult<List<NumberBookByPublisherDTO>>> GetBookByName([FromBody]NameDTO nameDTO)
        {
            var publisher = await context.Publisher.Where(x=>x.Name.Contains(nameDTO.name)).ToListAsync();
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
        [HttpGet("sltrongthang")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<ThongKeDTO>> GetTop5Thang()
        {
            var nxbs = await context.Publisher.ToListAsync();
            List<SachNXBTrongThangDTO> sachNXBTrongThangDTOs = new List<SachNXBTrongThangDTO>();
            var carts = await context.Cart.Where(x => x.DateOfCreated.Year == DateTime.Now.Year && x.DateOfCreated.Month == DateTime.Now.Month && x.AdminApprove == true)
                    .ToListAsync();
            var types = await context.Type.ToListAsync();
            var books = await context.Book.ToListAsync();
 
                foreach(var cart in carts)
                {
                    var detailcarts = await context.DetailCart.Where(x => x.CartId == cart.Id).ToListAsync();
                    foreach(var data in detailcarts)
                    {
                        foreach(var book in books)
                        {
                            if(data.BookId==book.Id)
                            {
                                bool check = false;
                                foreach (var datatemp in sachNXBTrongThangDTOs)
                                {
                                    if(datatemp.SachId==book.Id)
                                    {
                                        datatemp.Sl += data.Quantity;
                                        check = true;
                                    }
                                }
                                if (!check)
                                {
                                    SachNXBTrongThangDTO sachNXBTrongThangDTO = new SachNXBTrongThangDTO();
                                    sachNXBTrongThangDTO.IdNXB = nxbs[nxbs.FindIndex(x=>x.Id==book.PublisherId)].Id;
                                    sachNXBTrongThangDTO.IdTheLoai = book.TypeId;
                                    sachNXBTrongThangDTO.SachId = book.Id;
                                sachNXBTrongThangDTO.NameNXB = nxbs[nxbs.FindIndex(x => x.Id == book.PublisherId)].Name;
                                    sachNXBTrongThangDTO.NameTheLoai = types[types.FindIndex(x=>x.Id==book.TypeId)].Name;
                                    sachNXBTrongThangDTO.Sl = data.Quantity;
                                    sachNXBTrongThangDTOs.Add(sachNXBTrongThangDTO);
                                }
                                break;
                            }
                        }
                    }
                
                }
            List<TheLoaiTrongThangDTO> theLoaiTrongThangDTOs = new List<TheLoaiTrongThangDTO>();
            List<NxbTrongThangDTO> nxbTrongThangDTOs = new List<NxbTrongThangDTO>();
            foreach (var item in sachNXBTrongThangDTOs)
            {
                if(theLoaiTrongThangDTOs.FindIndex(x=>x.id==item.IdTheLoai)<0)
                {
                    TheLoaiTrongThangDTO theLoaiTrongThangDTO = new TheLoaiTrongThangDTO();
                    theLoaiTrongThangDTO.id = item.IdTheLoai;
                    theLoaiTrongThangDTO.name = item.NameTheLoai;
                    theLoaiTrongThangDTO.sl = item.Sl;
                    theLoaiTrongThangDTOs.Add(theLoaiTrongThangDTO);
                }
                else
                {
                    theLoaiTrongThangDTOs[theLoaiTrongThangDTOs.FindIndex(x => x.id == item.IdTheLoai)].sl += item.Sl;
                }
                if (nxbTrongThangDTOs.FindIndex(x => x.id == item.IdNXB) <0)
                {
                    NxbTrongThangDTO nxbTrongThangDTO = new NxbTrongThangDTO();
                    nxbTrongThangDTO.id = item.IdNXB;
                    nxbTrongThangDTO.name = item.NameNXB;
                    nxbTrongThangDTO.sl = item.Sl;
                    nxbTrongThangDTOs.Add(nxbTrongThangDTO);
                }
                else
                {
                    nxbTrongThangDTOs[nxbTrongThangDTOs.FindIndex(x => x.id == item.IdNXB)].sl += item.Sl;
                }
            }
            ThongKeDTO thongKeDTO = new ThongKeDTO();
            thongKeDTO.nxbs = nxbTrongThangDTOs;
            thongKeDTO.theLoais = theLoaiTrongThangDTOs;
            return thongKeDTO;
        }
    }
}
