using Application.BaseValidators;
using Application.Costumers;
using FluentValidation;

namespace Application.Departments
{
    public class CustomerValidator : AbstractValidator<CustomerDto>
    {
        public CustomerValidator()
        {
            RuleFor(d => d.Name).SetValidator(new NotNullValidator<CustomerDto, string>())
                                .SetValidator(new ValidLengthValidator<CustomerDto, string>(4,30));
            RuleFor(d => d.Email).SetValidator(new NotNullValidator<CustomerDto, string>())
                                .SetValidator(new EmailValidator<CustomerDto, string>());
            RuleFor(d => d.Phone).SetValidator(new NotNullValidator<CustomerDto, string>())
                                          .Must(BeValidNumber).WithMessage("Invalid phone number. It should contain exactly 9 digits.");
            RuleFor(d => d.ShippingAddress).SetValidator(new NotNullValidator<CustomerDto, object>());
        }

        private bool BeValidNumber(string number)
        {
            return number != null && number.Length == 9 && number.All(char.IsDigit);
        }
    }
}
