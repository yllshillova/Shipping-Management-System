namespace Domain.Enums
{
    public enum ShipmentStatus : byte
    {
        Shipped = 0,
        InTransit =1,
        Delivered = 2,
        Pending =3,
        Cancelled = 4,
    }
}
