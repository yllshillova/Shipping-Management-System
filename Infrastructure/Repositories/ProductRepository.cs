using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class ProductRepository(DataContext context) : EntityBaseRepository<Product>(context), IProductRepository
    {
    }
}
