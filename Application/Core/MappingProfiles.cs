using Application.Costumers;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles() {
            CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}
