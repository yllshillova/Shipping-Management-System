using Application.Accounts.Users;
using Application.Baskets;
using Application.Costumers;
using Application.Orders;
using Application.Products;
using Application.Shipments;
using Application.Warehouses;
using AutoMapper;
using Domain.Entities;
using Domain.Entities.OrderAggregate;

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
            CreateMap<Order, OrderDto>()
               .ReverseMap();
            CreateMap<Shipment, ShipmentDto>()
              .ReverseMap();
            CreateMap<Basket, BasketDto>()
              .ReverseMap(); 
            CreateMap<BasketItem, BasketItemDto>()
              .ReverseMap();
            CreateMap<AppUser, UserDto>()
              .ReverseMap();
        }
    }
}
