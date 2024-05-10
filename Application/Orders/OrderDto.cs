using Application.Base;
using Domain.Entities.OrderAggregate;

namespace Application.Orders
{
    public class OrderDto : BaseEntityDto
    {
        public DateTime OrderDate { get; set; }
        public string ShippingAddress { get; set; }
        public string OrderStatus { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderItem> Items { get; set; } = new();
        public Guid CustomerId { get; set; }
    }
}