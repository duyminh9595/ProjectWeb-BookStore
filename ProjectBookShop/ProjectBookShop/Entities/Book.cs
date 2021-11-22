using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    [Table("Book")]
    public class Book
    {
        public Book()
        {
            this.Quantity = 0;
            this.Status = true;
            this.DateOfCreated= DateTime.Now;
            BookImages = new List<BookImage>();
        }
        [Key]
        public int Id { get; set; }
        public int PublisherId { get; set; }
        public int TypeId { get; set; }
        public Publisher Publisher { get; set; }
        public AdminUser AdminUser { get; set; }
        public Type Type { get; set; }
        [Required]
        public string Name { get; set; }
        public int Quantity { get; set; }
        public bool Status { get; set; }
        [Required]
        public string ShortReview { get; set; }
        public List<BookImage> BookImages { get; set; }
        public DateTime DateOfDisabled { get; set; }
        public int Price { get; set; }
        public string UrlBookImageShow { get; set; }
        public string AuthorName { get; set; }
        public DateTime DateOfCreated { get; set; }

    }
}
