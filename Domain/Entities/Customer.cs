using Domain.Base;
using Domain.Entities.OrderAggregate;

namespace Domain.Entities
{
    public class Customer : EntityBase
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ShippingAddress { get; set; }
    }
}
