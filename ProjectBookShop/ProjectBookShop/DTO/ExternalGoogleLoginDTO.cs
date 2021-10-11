using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class ExternalGoogleLoginDTO
    {
        public ExternalGoogleLoginDTO()
        {
            this.ProviderName = "Google";
        }
        public string Email { get; set; }
        public string FamilyName { get; set; }
        public string GivenName { get; set; }
        public string ProviderName { get; set; }
        public string Picture { get; set; }

    }
}
