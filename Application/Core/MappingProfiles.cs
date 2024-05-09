using Application.Costumers;
using Application.Products;
using Application.Warehouses;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Customer, CustomerDto>()
                .ReverseMap();
            CreateMap<Warehouse, WarehouseDto>()
                .ReverseMap();
            CreateMap<Product, ProductDto>()
                .ReverseMap();
        }
    }
}
