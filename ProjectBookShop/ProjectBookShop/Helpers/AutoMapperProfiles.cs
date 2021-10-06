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
            CreateMap<RegisterUserDTO, UserInfo>()
                .ForMember(x => x.DateOfBirth, options => options.Ignore())
                .ForMember(x => x.DateOfCreated, options => options.Ignore());
            CreateMap<PublisherReadDTO, Publisher>().ReverseMap();
            CreateMap<PublisherCreateDTO, Publisher>().ReverseMap();
            CreateMap<TypeReadDTO, Entities.Type>().ReverseMap();
            CreateMap<TypeCreateDTO, Entities.Type>().ReverseMap();
            CreateMap<BookCreateDTO, Book>().ReverseMap();
            CreateMap<BookReadDTO, Book>().ReverseMap();
            CreateMap<Cart, ListCartDTO>().ReverseMap();

            CreateMap<Book, BookInDetailCartDTO>().ReverseMap();

            CreateMap<CouponDiscount, ListCouponDTO>().ReverseMap();

            CreateMap<CouponCreateDTO, CouponDiscount>().ReverseMap();
        }
    }
}
