using AutoMapper;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterUserDTO, Customer>()
                .ForMember(x => x.DateOfBirth, options => options.Ignore())
                .ForMember(x => x.DateOfCreated, options => options.Ignore());
        }
    }
}
