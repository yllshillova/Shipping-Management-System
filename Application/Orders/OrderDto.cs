using Application.Base;

namespace Application.Orders
{
    public class OrderDto : BaseEntityDto
    {
        public DateTime OrderDate { get; set; }
        public string ShippingAddress { get; set; }
        public string OrderStatus { get; set; }
        public decimal TotalAmount { get; set; }
        public Guid CustomerId { get; set; }
    }
}