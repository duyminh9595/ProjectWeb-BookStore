using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public interface IUserService
    {
        public Task<bool> SignUpUser(RegisterUserDTO registerUserDTO);
        public Task<LoginSuccessDTO> LoginUser(UserLoginDTO userLoginDTO);
        public Task<bool> UpdatePassword(UpdatePasswordDTO updatePasswordDTO, UserInfo userInfo);
        public Task<bool> UpdateInfoUser(UserInfoUpdateDTO userInfoUpdateDTO, UserInfo userInfo);
        public Task<LoginSuccessDTO> SignUpUserForExternalAccountGoogle(ExternalGoogleLoginDTO externalGoogleLoginDTO);
        public Task<LoginSuccessDTO> LoginForExternalAccountGoogle(ExternalGoogleLoginDTO externalGoogleLoginDTO);
        public Task<LoginSuccessDTO> LoginForExternamAccoutFacebook(ExternalLoginFacebookDTO externalLoginFacebookDTO);
    }
}
