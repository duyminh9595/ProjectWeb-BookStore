using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class Type
    {
        public Type()
        {
            Books = new List<Book>();
        }
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Book> Books { get; set; }
        public AdminUser AdminUser { get; set; }
        public DateTime DateOfCreated { get; set; }
    }
}
