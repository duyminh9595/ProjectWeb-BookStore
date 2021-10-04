using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class BookUploadImageDTO
    {
        public int Id { get; set; }
        public IFormFile Picture { get; set; }
    }
}
