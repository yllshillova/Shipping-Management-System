using Domain.Base;

namespace Domain.Entities
{
    public class PickListItem : EntityBase
    {
        public Guid PickListId { get; set; }
        public PickList PickList { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}