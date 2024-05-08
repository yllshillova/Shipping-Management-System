using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityConfiguration
{
    internal sealed class ShipmentConfiguration : IEntityTypeConfiguration<Shipment>
    {
        public void Configure(EntityTypeBuilder<Shipment> builder)
        {
            builder.Property(s => s.Carrier).IsRequired();
            builder.Property(s => s.TrackingNumber).IsRequired();
            builder.Property(s => s.ShipmentStatus).IsRequired();

            builder.HasOne(s => s.Order)
                   .WithMany()
                   .HasForeignKey(s => s.OrderId)
                   .IsRequired();
        }
    }
}
