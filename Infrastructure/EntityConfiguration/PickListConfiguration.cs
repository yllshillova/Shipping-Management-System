using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class PickListConfiguration : IEntityTypeConfiguration<PickList>
    {
        public void Configure(EntityTypeBuilder<PickList> builder)
        {
            builder.HasMany(pl => pl.Items)
                   .WithOne(i => i.PickList)
                   .HasForeignKey(i => i.PickListId);

            builder.HasOne(pl => pl.Order)
                   .WithMany()
                   .HasForeignKey(pl => pl.OrderId)
                   .IsRequired();

            builder.HasOne(pl => pl.Warehouse)
                   .WithMany()
                   .HasForeignKey(pl => pl.WarehouseId)
                   .IsRequired();
        }
    }
}