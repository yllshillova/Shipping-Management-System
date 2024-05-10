namespace Application.Orders
{
    public class CreateOrderDto
    {
        public string ShippingAddress { get; set; }
        public Guid CustomerId { get; set; }
    }
}
