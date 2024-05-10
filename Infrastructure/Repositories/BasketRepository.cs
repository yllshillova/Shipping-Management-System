using Domain.Contracts;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal sealed class BasketRepository(DataContext context) : EntityBaseRepository<Basket>(context), IBasketRepository
    {

        public async Task<Basket> GetBasketAsync(Guid basketId)
        {
            var basket = await context.Baskets
                .Include(b => b.Items)
                .ThenInclude(bi => bi.Product)
                .FirstOrDefaultAsync(b => b.Id == basketId);

            return basket;
        }
        public async Task<Basket> GetBasketByEmployerIdAsync(string employerId)
        {
            var basket = await context.Baskets
                .Include(b => b.Items)
                .ThenInclude(bi => bi.Product)
                .FirstOrDefaultAsync(b => b.EmployerId == employerId);

            return basket;
        }

        public async Task<bool> AddItemAsync(string employerId,Guid productId, int quantity)
        {
            var basket = await GetBasketByEmployerIdAsync(employerId);

            var product = await context.Products.FindAsync(productId);
            if (product == null)
            {
                return false;
            }

            var existingItem = basket.Items.FirstOrDefault(i => i.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                var newItem = new BasketItem
                {
                    BasketId = basket.Id,
                    ProductId = productId,
                    Quantity = quantity,
                    Price = product.Price
                };
                basket.Items.Add(newItem);
            }

            return await context.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveItemAsync(string employerId, Guid productId, int quantity)
        {
            var basket = await context.Baskets
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.EmployerId == employerId);
            if (basket == null) return false;

            var product = await context.Products.FindAsync(productId);
            if (product == null)
            {
                return false;
            }

            var item = basket.Items.FirstOrDefault(i => i.ProductId == product.Id);
            if (item == null) return false;

            item.Quantity -= quantity;

            if (item.Quantity <= 0)
            {
                basket.Items.Remove(item);
            }
            
            var result = await context.SaveChangesAsync() > 0;

            return result;
        }

    }
}
