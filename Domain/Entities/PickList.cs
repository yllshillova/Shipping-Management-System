using Domain.Base;
using Domain.Entities.OrderAggregate;

namespace Domain.Entities
{
    public class PickList : EntityBase
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        public Guid WarehouseId { get; set; }
        public Warehouse Warehouse { get; set; }
        public List<PickListItem> Items { get; set; } = new();
    }
}
