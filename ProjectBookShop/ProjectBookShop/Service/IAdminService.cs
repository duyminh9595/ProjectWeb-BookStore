using ProjectBookShop.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public interface IAdminService
    {
        public Task<LoginSuccessDTO> AdminUser(UserLoginDTO userLoginDTO);
        public Task<bool> SignUpAdmin(RegisterUserDTO registerUserDTO);
    }
}
