using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class WarehouseRepository(DataContext context) : EntityBaseRepository<Warehouse>(context), IWarehouseRepository
    {
    }
}
