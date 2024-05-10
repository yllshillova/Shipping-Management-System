using Domain.Contracts;
using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class OrderRepository(DataContext context) : EntityBaseRepository<Order>(context), IOrderRepository
    {
        public async Task<Order> GetOrderByIdAsync(Guid Id)
        {
            var order = await context.Orders
                .Include(b => b.Items)
                .ThenInclude(bi => bi.Product)
                .FirstOrDefaultAsync(b => b.Id == Id);

            return order;
        }
    }
}
