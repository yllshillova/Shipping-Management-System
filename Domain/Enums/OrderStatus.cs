namespace Domain.Enums
{
    public enum OrderStatus : byte
    {
        Pending = 0,
        Picked = 1,
        Shipped = 2,
        InTransit = 3,
        Delivered = 4,
        Cancelled = 5
    }
}
