using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class BookCreateDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string ShortReview { get; set; }
        [Required]
        public int PublisherId { get; set; }
        [Required]
        public int TypeId { get; set; }
        [Required]
        public int Quantity { get; set; }
        public int MyProperty { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string AuthorName { get; set; }
    }
}
