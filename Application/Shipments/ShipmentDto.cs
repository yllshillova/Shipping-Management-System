using Application.Base;

namespace Application.Shipments
{
    public class ShipmentDto:BaseEntityDto
    {
        public Guid OrderId { get; set; }
        public string Carrier { get; set; }
        public string TrackingNumber { get; set; }
        public string ShipmentStatus { get; set; }
    }
}
