using Application.Base;
using Domain.Entities.OrderAggregate;

namespace Application.Costumers
{
    public class CustomerDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}