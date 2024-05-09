using Application.BaseValidators;
using FluentValidation;

namespace Application.Products
{
    public class ProductValidator : AbstractValidator<ProductDto>
    {
        public ProductValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<ProductDto, string>())
                                .SetValidator(new ValidLengthValidator<ProductDto, string>(4, 30));
            RuleFor(d => d.Description).SetValidator(new NotNullValidator<ProductDto, string>())
                                .SetValidator(new EmailValidator<ProductDto, string>()); 
            RuleFor(d => d.Price)
                                .SetValidator(new NotNullValidator<ProductDto, decimal>())
                                .GreaterThan(0).WithMessage("Price must be greater than zero."); 
            RuleFor(d => d.StockLevel)
                                .SetValidator(new NotNullValidator<ProductDto, int>())
                                .GreaterThanOrEqualTo(0).WithMessage("Stock level must be zero or greater."); 
        }

    }
}
