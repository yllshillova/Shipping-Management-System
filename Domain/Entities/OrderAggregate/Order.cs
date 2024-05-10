using Domain.Base;
using Domain.Enums;

namespace Domain.Entities.OrderAggregate
{
    public class Order : EntityBase
    {
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string ShippingAddress { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public List<OrderItem> Items { get; set; } = new();
        public decimal TotalAmount { get; set; }

    }
}
