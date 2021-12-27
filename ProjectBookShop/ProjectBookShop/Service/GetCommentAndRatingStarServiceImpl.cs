using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public class GetCommentAndRatingStarServiceImpl : IGetCommentAndAndRatingStarService
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GetCommentAndRatingStarServiceImpl(ApplicationDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<RatingStarBook> CheckUserHasCommend(int bookId, int userId)
        {
            var data = await context.RatingStarBook.FirstOrDefaultAsync(x => (x.BookId == bookId && x.UserInfoId == userId));
            if(data==null)
            {
                return null;
            }
            return data;
        }   

        public async Task<List<CommendAndRatingDTO>> GetAllCommandAndRatingOfBookId(int bookId)
        {
            var data = await context.RatingStarBook.Where(x => x.BookId == bookId && x.Status == true).OrderByDescending(x=>x.DateOfCreated).ToListAsync();
            var item = mapper.Map<List<CommendAndRatingDTO>>(data);
            return item;
        }
        public async Task<List<CommendAndRatingDTO>> GetAllCommandAndRatingOfBookBaseOnUserId(int userid)
        {
            var data = await context.RatingStarBook.Where(x => x.UserInfoId == userid).OrderByDescending(x => x.DateOfCreated).ToListAsync();
            var item = mapper.Map<List<CommendAndRatingDTO>>(data);
            return item;
        }

        public async Task<bool> UserHasBuyProduct(int bookId, int userId)
        {
            var detailCart = await context.DetailCart.Where(x => (x.BookId == bookId)).ToListAsync();
            var cart = await context.Cart.ToListAsync();
            foreach (var item in cart)
            {
                foreach (var detail in detailCart)
                {
                    if(item.CustomerId==userId && item.Id==detail.CartId)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
