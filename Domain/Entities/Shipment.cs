using Domain.Base;
using Domain.Entities.OrderAggregate;
using Domain.Enums;

namespace Domain.Entities
{
    public class Shipment : EntityBase
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        public string Carrier { get; set; }
        public string TrackingNumber { get; set; }
        public ShipmentStatus ShipmentStatus { get; set; }
        
    }
}
