using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Entities
{
    public class UserRole
    {
        public int Id { get; set; }
        public int UserInfoId { get; set; }
        public UserInfo UserInfo { get; set; }
        public string Role_Name { get; set; }
    }
}
