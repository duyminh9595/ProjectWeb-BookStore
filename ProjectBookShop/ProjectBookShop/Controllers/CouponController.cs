using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using ProjectBookShop.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/coupon")]
    public class CouponController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CouponController(ApplicationDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet("list")]
        public async Task<ActionResult<List<ListCouponDTO>>>GetAllCoupon([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.CouponDiscount.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var coupons = await queryable.Paginate(pagination).ToListAsync();
            return mapper.Map<List<ListCouponDTO>>(coupons);
        }

        [HttpGet("listcustomer")]
        public async Task<ActionResult<List<ListCouponDTO>>> GetAllCouponForCustomer([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.CouponDiscount.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var coupons = await queryable.Where(x=>x.Status==true).Paginate(pagination).ToListAsync();
            return mapper.Map<List<ListCouponDTO>>(coupons);
        }

        [HttpGet("{id:int}",Name ="getCoupon")]
        public async Task<ActionResult<CouponDetailDTO>> GetCouponById(int id)
        {
            var coupon = await context.CouponDiscount.FirstOrDefaultAsync(x => x.Id == id);
            return mapper.Map<CouponDetailDTO>(coupon);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<CouponDetailDTO>>CreateCoupon([FromBody]CouponCreateDTO couponCreateDTO)
        {
            var coupon = mapper.Map<CouponDiscount>(couponCreateDTO);
            context.Add(coupon);
            await context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("disable")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<CouponDetailDTO>> DisableCoupon(int id)
        {
            var coupon = await context.CouponDiscount.FirstOrDefaultAsync(x => x.Id == id && x.Id!=1);
            coupon.Status = false;
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("enable")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<CouponDetailDTO>> EnableCoupon(int id)
        {
            var coupon = await context.CouponDiscount.FirstOrDefaultAsync(x => x.Id == id && x.Id!=1);
            coupon.Status = true;
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
