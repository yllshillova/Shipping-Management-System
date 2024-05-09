using Application.BaseValidators;
using Application.Shipments;
using FluentValidation;

namespace Application.Shipments
{
    public class ShipmentValidator : AbstractValidator<ShipmentDto>
    {
        public ShipmentValidator()
        {
            RuleFor(d => d.Carrier).SetValidator(new NotNullValidator<ShipmentDto, string>())
                                .SetValidator(new ValidLengthValidator<ShipmentDto, string>(4, 30));
            RuleFor(d => d.TrackingNumber).SetValidator(new NotNullValidator<ShipmentDto, string>())
                                .SetValidator(new ValidLengthValidator<ShipmentDto, string>(4,10)); 
            RuleFor(d => d.ShipmentStatus)
                                .SetValidator(new NotNullValidator<ShipmentDto, string>())
                                .SetValidator(new ValidLengthValidator<ShipmentDto, string>(2, 10));
            RuleFor(d => d.OrderId)
                                .SetValidator(new NotNullValidator<ShipmentDto, Guid>());
        }

    }
}
