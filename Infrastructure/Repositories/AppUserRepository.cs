using Domain.Contracts;
using Domain.Entities;

namespace Infrastructure.Repositories
{
    internal sealed class AppUserRepository(DataContext context) : EntityBaseRepository<AppUser>(context), IAppUserRepository
    {
    }
}
