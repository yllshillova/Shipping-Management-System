using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(p => p.Id);
        }
    }
}
