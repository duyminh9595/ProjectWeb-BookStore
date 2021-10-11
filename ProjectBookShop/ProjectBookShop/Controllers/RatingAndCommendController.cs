using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using ProjectBookShop.Service;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/rating")]
    public class RatingAndCommendController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IGetCommentAndAndRatingStarService getCommentAndAndRatingStarService;

        public RatingAndCommendController(ApplicationDbContext context,
            IMapper mapper, IGetCommentAndAndRatingStarService getCommentAndAndRatingStarService)
        {
            this.context = context;
            this.mapper = mapper;
            this.getCommentAndAndRatingStarService = getCommentAndAndRatingStarService;
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<CommendAndRatingDTO>>>GetAllCommendAndRatingOfBookId(int id)
        {
            //bookid
            var data = await getCommentAndAndRatingStarService.GetAllCommandAndRatingOfBookId(id);
            var users = await context.Customer.ToListAsync();
            foreach (var item in users)
            {
                foreach (var cmd in data)
                {
                    if(cmd.UserInfoId==item.Id)
                    {
                        cmd.UserInfoEmail = item.Email;
                    }
                }
            }
            return data;
        }
        [HttpGet("checkrating/{id:int}")]
        public async Task<ActionResult<bool>>CheckUserHasRating(int id)
        {
            var userInfo = await CheckEmailInToken();
            var ratingAndCommend = await getCommentAndAndRatingStarService.CheckUserHasCommend(id, userInfo.Id);
            if (ratingAndCommend != null)
            {
                return Ok(true);
            }
            else
                return Ok(false);
        }
        [HttpGet("checkbuyproduct/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult<bool>>CheckUserHasBuyProduct(int id)
        {
            var userInfo = await CheckEmailInToken();
            var userHasBuy = await getCommentAndAndRatingStarService.UserHasBuyProduct(id, userInfo.Id);
            if (userHasBuy)
                return Ok(true);
            else
                return Ok(false);
        }
        [HttpPost("{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult> GetAllCommendAndRatingOfBookId(int id,[FromBody] CreateRatingStarAndCommendDTO createRatingStarAndCommendDTO)
        {
            var userInfo = await CheckEmailInToken();
            if (userInfo != null)
            {
                var book = await context.Book.FirstOrDefaultAsync(x => x.Id == createRatingStarAndCommendDTO.BookId);
                if(book!=null)
                {
                    var checkUserHasBuyProduct = await getCommentAndAndRatingStarService.UserHasBuyProduct(id, userInfo.Id);
                    if (checkUserHasBuyProduct)
                    {
                        var data = mapper.Map<RatingStarBook>(createRatingStarAndCommendDTO);
                        data.Book = book;
                        data.UserInfoId = userInfo.Id;
                        data.UserInfo = userInfo;
                        data.DateOfCreated = DateTime.Now;
                        context.Add(data);
                        await context.SaveChangesAsync();
                        return Ok();
                    }
                    else
                        return BadRequest("Người dùng chưa mua hàng");
                }
                else
                {
                    return NotFound("Book không tìm thấy");
                }
            }
            else
            {
                return BadRequest("Tài Khoản Không Hợp Lệ");
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
    }
}
