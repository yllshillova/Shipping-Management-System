using Domain.Entities;
using Domain.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) 
        {
            
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<Customer> Costumers { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Address> ShippingAddresses { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }

    }
}
