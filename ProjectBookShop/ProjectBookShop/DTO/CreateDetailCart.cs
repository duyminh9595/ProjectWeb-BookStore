using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CreateDetailCart
    {
        public string CouponCode { get; set; }
        public List<BookInDetailCartDTO> BookInDetailCartDTOs { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public int Sdt { get; set; }
        [Required]
        public string NameReceiveProduct { get; set; }
        public string Note { get; set; }

    }
}
