using Application.Base;

namespace Application.Costumers
{
    public class CustomerDto : BaseEntityDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ShippingAddress { get; set; }
    }
}