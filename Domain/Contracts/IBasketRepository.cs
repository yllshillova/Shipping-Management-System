using Domain.Base;
using Domain.Entities;

namespace Domain.Contracts
{
    public interface IBasketRepository : IEntityBaseRepository<Basket>
    {
        Task<bool> AddItemAsync(string employerId, Guid productId, int quantity);
        Task<Basket> GetBasketAsync(Guid basketId);
        Task<Basket> GetBasketByEmployerIdAsync(string employerId);
        Task<bool> RemoveItemAsync(string employerId, Guid productId, int quantity);
    }
}
