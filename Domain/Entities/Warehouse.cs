using Domain.Base;

namespace Domain.Entities
{
    public class Warehouse : EntityBase
    {
        public string Name { get; set; }
        public string Location { get; set; }
    }
}
