using Domain.Base;

namespace Domain.Entities
{
    public class Product : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int StockLevel { get; set; }
        public Guid WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}
