using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CreateRatingStarAndCommendDTO
    {
        public CreateRatingStarAndCommendDTO()
        {
            this.Status = true;
        }
        [Required]
        public int BookId { get; set; }
        [Required]
        public float Rating { get; set; }
        public string Commend { get; set; }
        public bool Status { get; set; }
    }
}
