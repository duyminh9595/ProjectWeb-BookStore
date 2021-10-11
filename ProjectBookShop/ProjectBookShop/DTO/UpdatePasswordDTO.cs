using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class UpdatePasswordDTO
    {
        [MinLength(6)]
        public string OldPassword { get; set; }
        [MinLength(6)]
        public string NewPassword { get; set; }
    }
}
