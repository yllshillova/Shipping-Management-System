using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class BasketItemRepository(DataContext context) : EntityBaseRepository<BasketItem>(context), IBasketItemRepository
    {
    }
}
