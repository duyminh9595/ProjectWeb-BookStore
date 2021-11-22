using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public interface IBookService
    {
        public Task<BookReadDTO> CreateNewBook(BookCreateDTO bookCreateDTO, AdminUser adminUser);
    }
}
