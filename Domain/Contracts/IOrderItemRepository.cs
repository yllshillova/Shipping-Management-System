using Domain.Base;
using Domain.Entities.OrderAggregate;

namespace Domain.Contracts
{
    public interface IOrderItemRepository : IEntityBaseRepository<OrderItem>
    {
    }
}
