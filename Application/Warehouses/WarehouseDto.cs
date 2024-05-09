using Application.Base;

namespace Application.Warehouses
{
    public class WarehouseDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
    }
}