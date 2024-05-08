using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.OrderAggregate;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(o => o.TotalAmount)
                   .HasPrecision(18, 2);
            
            builder.HasMany(o => o.Items)
                   .WithOne(i => i.Order)
                   .HasForeignKey(i => i.OrderId);

            builder.HasOne(o => o.Customer)
                   .WithMany()
                   .HasForeignKey(o => o.CustomerId)
                   .IsRequired();

            builder.OwnsOne(c => c.ShippingAddress, saBuilder =>
            {
                saBuilder.Property(sa => sa.FullName).IsRequired();
                saBuilder.Property(sa => sa.Address1).IsRequired();
                saBuilder.Property(sa => sa.Address2);
                saBuilder.Property(sa => sa.City).IsRequired();
                saBuilder.Property(sa => sa.State).IsRequired();
                saBuilder.Property(sa => sa.Zip).IsRequired();
                saBuilder.Property(sa => sa.Country).IsRequired();
            });
        }
    }
}