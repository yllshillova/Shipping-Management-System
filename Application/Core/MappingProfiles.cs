using Application.Costumers;
using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.OrderAggregate;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Customer, CustomerDto>().ReverseMap();
            //CreateMap<ShippingAddress, ShippingAddressDto>().ReverseMap();
        }
    }
}
