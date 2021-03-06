using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class UserInfoDTO
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfCreated { get; set; }
        [Required]
        public string Email { get; set; }
        public bool Status { get; set; }
        [Required]
        public bool Gender { get; set; }
        public string UrlImageAvatar { get; set; }
    }
}
