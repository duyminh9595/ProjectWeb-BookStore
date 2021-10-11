using ProjectBookShop.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public interface IArticleService
    {
        public Task<ArticleShowDTO> GetArticleById(int id);
    }
}
