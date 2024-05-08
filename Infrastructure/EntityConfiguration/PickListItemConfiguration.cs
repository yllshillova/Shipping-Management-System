using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class PickListItemConfiguration : IEntityTypeConfiguration<PickListItem>
    {
        public void Configure(EntityTypeBuilder<PickListItem> builder)
        {
            builder.HasOne(i => i.PickList)
                   .WithMany(pl => pl.Items)
                   .HasForeignKey(i => i.PickListId)
                   .IsRequired();

            builder.HasOne(i => i.Product)
                   .WithMany()
                   .HasForeignKey(i => i.ProductId)
                   .IsRequired();
        }
    }
}