using Application.BaseValidators;
using FluentValidation;

namespace Application.Orders
{
    public class OrderValidator : AbstractValidator<OrderDto>
    {
        public OrderValidator()
        {
            RuleFor(d => d.OrderDate).SetValidator(new NotNullValidator<OrderDto, DateTime>())
               .Must(BeAValidDate).WithMessage("Invalid order date format.")
                   .Must(BeInFuture).WithMessage("Order date must be in the future.");
            RuleFor(d => d.ShippingAddress).SetValidator(new NotNullValidator<OrderDto, string>())
                                .SetValidator(new ValidLengthValidator<OrderDto, string>(2,50)); 
            RuleFor(d => d.TotalAmount)
                                .SetValidator(new NotNullValidator<OrderDto, decimal>())
                                .GreaterThan(0).WithMessage("Price must be greater than zero.");
            RuleFor(d => d.OrderStatus)
                                .SetValidator(new NotNullValidator<OrderDto, string>());
            RuleFor(d => d.CustomerId)
                              .SetValidator(new NotNullValidator<OrderDto, Guid>()).WithMessage("Select a Customer!");
        }
        private bool BeAValidDate(DateTime date)
        {
            return date != default;
        }

        private bool BeInFuture(DateTime date)
        {
            return date > DateTime.Now;
        }

    }
}
