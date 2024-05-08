using Application.Base;
using Application.DTOs;

namespace Application.Costumers
{
    public class CustomerDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public ShippingAddressDto ShippingAddress { get; set; }
    }
}