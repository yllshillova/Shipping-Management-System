using Domain.Contracts;
using Domain.Entities.OrderAggregate;

namespace Infrastructure.Repositories
{
    internal sealed class OrderRepository(DataContext context) : EntityBaseRepository<Order>(context), IOrderRepository
    {
    }
}
