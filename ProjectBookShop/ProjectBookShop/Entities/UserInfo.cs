using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    [Index(nameof(Email), IsUnique = true)]
    public class UserInfo
    {
        public UserInfo()
        {
            this.Status = true;
            this.UserRoles = new List<UserRole>();
            this.DateOfCreated= DateTime.Now.Year.ToString() + "-" + DateTime.Now.Month.ToString() + "-" + DateTime.Now.Day.ToString();
        }
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfCreated { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        public bool Status { get; set; }
        public List<UserRole> UserRoles { get; set; }
        [Required]
        public bool Gender { get; set; }
        public string UrlImageAvatar { get; set; }
        public string ProviderName { get; set; }
    }
}
