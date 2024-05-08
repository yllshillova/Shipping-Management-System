using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class ShipmentRepository(DataContext context) : EntityBaseRepository<Shipment>(context), IShipmentRepository
    {
    }
}
