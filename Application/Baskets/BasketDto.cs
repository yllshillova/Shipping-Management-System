using Application.Base;

namespace Application.Baskets
{
    public class BasketDto : BaseEntityDto
    {
        public List<BasketItemDto> Items { get; set; } = new();
        public string EmployerId { get; set; }
    }
}
