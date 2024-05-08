using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.OrderAggregate;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.Property(oi => oi.Quantity).IsRequired();
            builder.Property(oi => oi.Price).IsRequired();

            builder.HasOne(oi => oi.Order)
                   .WithMany(o => o.Items)
                   .HasForeignKey(oi => oi.OrderId)
                   .IsRequired();

            builder.HasOne(oi => oi.Product)
                   .WithMany()
                   .HasForeignKey(oi => oi.ProductId)
                   .IsRequired();
        }
    }
}
