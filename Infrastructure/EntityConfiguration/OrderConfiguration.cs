using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.OrderAggregate;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasMany(o => o.Items)
                   .WithOne(i => i.Order)
                   .HasForeignKey(i => i.OrderId);
                    
            builder.HasOne(o => o.Customer)
                   .WithMany()
                   .HasForeignKey(o => o.CustomerId)
                   .IsRequired();
        }
    }
}