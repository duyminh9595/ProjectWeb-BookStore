using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class BookImage
    {
        public BookImage()
        {
            this.Status = true;
        }
        public int Id { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }
        [Required]
        public string Url { get; set; }
        public bool Status { get; set; }
    }
}
