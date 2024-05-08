using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class PickListRepository(DataContext context) : EntityBaseRepository<PickList>(context), IPickListRepository
    {
    }
}
