using Application.Costumers;
using Application.Warehouses;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Customer, CustomerDto>()
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ReverseMap();
            CreateMap<Warehouse, WarehouseDto>()
                //.ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                //.ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ReverseMap();
        }
    }
}
