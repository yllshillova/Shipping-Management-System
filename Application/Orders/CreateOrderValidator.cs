using Application.BaseValidators;
using FluentValidation;

namespace Application.Orders
{
    public class CreateOrderValidator : AbstractValidator<CreateOrderDto>
    {
        public CreateOrderValidator()
        {
            RuleFor(d => d.ShippingAddress).SetValidator(new NotNullValidator<CreateOrderDto, string>())
                                .SetValidator(new ValidLengthValidator<CreateOrderDto, string>(2,50)); 
            RuleFor(d => d.CustomerId)
                              .SetValidator(new NotNullValidator<CreateOrderDto, Guid>()).WithMessage("Select a Customer!");
        }
    }
}
