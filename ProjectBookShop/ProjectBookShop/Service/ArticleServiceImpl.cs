using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public class ArticleServiceImpl : IArticleService
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ArticleServiceImpl(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<ArticleShowDTO> GetArticleById(int id)
        {
            var article = await context.Article.FirstOrDefaultAsync(x => x.Id == id);
            if (article != null)
            {
                var customer = await context.Customer.FirstOrDefaultAsync(x => x.Id == article.CustomerId);
                var data = mapper.Map<ArticleShowDTO>(article);
                data.AuthorName = customer.Email;
                return data;
            }
            else
                return null;
        }
    }
}
