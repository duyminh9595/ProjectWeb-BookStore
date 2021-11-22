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
    public class BookServiceImpl:IBookService
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public BookServiceImpl(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<BookReadDTO> CreateNewBook(BookCreateDTO bookCreateDTO,AdminUser adminUser)
        {
            var book = mapper.Map<Book>(bookCreateDTO);
            var publisher = await context.Publisher.FirstOrDefaultAsync(x => x.Id == bookCreateDTO.PublisherId);
            var type = await context.Type.FirstOrDefaultAsync(x => x.Id == bookCreateDTO.TypeId);
            book.Publisher = publisher;
            book.AdminUser = adminUser;
            book.Type = type;
            book.DateOfCreated = DateTime.Now;
            context.Add(book);
            type.Books.Add(book);
            publisher.Books.Add(book);
            await context.SaveChangesAsync();
            var bookReadDTO = mapper.Map<BookReadDTO>(book);
            return bookReadDTO; ;
        }

    }
}
