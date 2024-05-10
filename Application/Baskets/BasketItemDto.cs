using Application.Base;

namespace Application.Baskets
{
    public class BasketItemDto : BaseEntityDto
    {
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid BasketId { get; set; }
        public Guid ProductId { get; set; }
    }
}
