using FluentValidation;
using Application.DTOs;
using Application.BaseValidators;
using Application.Costumers;
using Domain.Entities.OrderAggregate;

namespace Application.Departments
{
    public class ShippingAddressValidator : AbstractValidator<ShippingAddress>
    {
        public ShippingAddressValidator()
        {
            RuleFor(sa => sa.FullName).SetValidator(new NotNullValidator<ShippingAddress, string>())
                                      .SetValidator(new ValidLengthValidator<ShippingAddress, string>(4, 30));

            RuleFor(sa => sa.Address1).SetValidator(new NotNullValidator<ShippingAddress, string>())
                                      .SetValidator(new ValidLengthValidator<ShippingAddress, string>(2, 100));

            RuleFor(sa => sa.Address2).SetValidator(new ValidLengthValidator<ShippingAddress, string>(2, 100));

            RuleFor(sa => sa.City).SetValidator(new NotNullValidator<ShippingAddress, string>())
                                      .SetValidator(new ValidLengthValidator<ShippingAddress, string>(4, 50));

            RuleFor(sa => sa.State).SetValidator(new NotNullValidator<ShippingAddress, string>())
                                      .SetValidator(new ValidLengthValidator<ShippingAddress, string>(4, 50));

            RuleFor(sa => sa.Zip).SetValidator(new NotNullValidator<ShippingAddress, string>())
                .Matches(@"^\d{5}(-\d{4})?$").WithMessage("Invalid ZIP code format.");

            RuleFor(sa => sa.Country).SetValidator(new NotNullValidator<ShippingAddress, string>())
                                      .SetValidator(new ValidLengthValidator<ShippingAddress, string>(4, 50));
        }
    }
}