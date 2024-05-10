using Application.Base;

namespace Application.Products
{
    public class ProductDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockLevel { get; set; }
        public Guid WarehouseId { get; set; }
    }
}