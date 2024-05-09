using Application.BaseValidators;
using FluentValidation;

namespace Application.Warehouses
{
    public class WarehouseValidator : AbstractValidator<WarehouseDto>
    {
        public WarehouseValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<WarehouseDto, string>())
                                .SetValidator(new ValidLengthValidator<WarehouseDto, string>(2, 30));
            RuleFor(d => d.Location).SetValidator(new NotNullValidator<WarehouseDto, string>())
                                .SetValidator(new ValidLengthValidator<WarehouseDto, string>(2,40));
        }
    }
}