using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class PickListItemRepository(DataContext context) : EntityBaseRepository<PickListItem>(context), IPickListItemRepository
    {
    }
}
