using Domain.Contracts;
using Domain.Entities.OrderAggregate;

namespace Infrastructure.Repositories
{
    internal sealed class OrderItemRepository(DataContext context) : EntityBaseRepository<OrderItem>(context), IOrderItemRepository
    {
    }
}
