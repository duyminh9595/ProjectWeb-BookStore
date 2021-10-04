using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class PublisherCreateDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
