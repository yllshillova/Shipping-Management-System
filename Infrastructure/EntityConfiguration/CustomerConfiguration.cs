using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
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
