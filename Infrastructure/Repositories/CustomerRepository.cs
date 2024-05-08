using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class CustomerRepository(DataContext context) : EntityBaseRepository<Customer>(context), ICustomerRepository
    {
    }
}
