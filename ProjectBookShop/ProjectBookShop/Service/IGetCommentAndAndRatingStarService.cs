using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public interface IGetCommentAndAndRatingStarService
    {
        public Task<List<CommendAndRatingDTO>> GetAllCommandAndRatingOfBookId(int bookId);
        public Task<RatingStarBook> CheckUserHasCommend(int bookId, int userId);
        public Task<bool> UserHasBuyProduct(int bookId, int userId);
    }
}
