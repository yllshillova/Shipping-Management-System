using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class WarehouseConfiguration : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            builder.Property(w => w.Name).IsRequired();
            builder.Property(w => w.Location).IsRequired();
        }
    }
}