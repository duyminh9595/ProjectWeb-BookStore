using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class UserInfo
    {
        public UserInfo()
        {
            this.Status = true;
            this.UserRoles = new List<UserRole>();
            CommendOnBooks = new List<CommendOnBook>();
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
        public string Password { get; set; }
        public bool Status { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public List<CommendOnBook> CommendOnBooks { get; set; }
        [Required]
        public bool Gender { get; set; }
    }
}
