using Domain.Base;
using Domain.Entities.OrderAggregate;

namespace Domain.Contracts
{
    public interface IOrderRepository : IEntityBaseRepository<Order>
    {
    }
}
