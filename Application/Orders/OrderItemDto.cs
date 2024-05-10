using Application.Base;

namespace Application.Orders
{
    public class OrderItemDto : BaseEntityDto
    {
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
    }
}