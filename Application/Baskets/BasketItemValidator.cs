using Application.BaseValidators;
using FluentValidation;

namespace Application.Baskets
{
    public class BasketItemValidator : AbstractValidator<BasketItemDto>
    {
        public BasketItemValidator()
        {
            RuleFor(d => d.ProductId).SetValidator(new NotNullValidator<BasketItemDto, Guid>());
            RuleFor(d => d.BasketId).SetValidator(new NotNullValidator<BasketItemDto, Guid>()); 
            RuleFor(d => d.Price)
                                .SetValidator(new NotNullValidator<BasketItemDto, decimal>())
                                .GreaterThan(0).WithMessage("Price must be greater than zero."); 
            RuleFor(d => d.Quantity)
                                .SetValidator(new NotNullValidator<BasketItemDto, int>())
                                .GreaterThan(0).WithMessage("Quantity must be greater than zero."); 
        }

    }
}
