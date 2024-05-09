using Application.Core;
using Application.BaseValidators;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;
using Domain.Entities;
using Application.Costumers;

namespace Application.Departments
{
    public class Edit
    {
        public record UpdateCustomerCommand(CustomerDto Customer) : IRequest<Result<Unit>>;

        public class UpdateCustomerCommandValidator : AbstractValidator<UpdateCustomerCommand>
        {
            public UpdateCustomerCommandValidator()
            {
                RuleFor(x => x.Customer).SetValidator(new CustomerValidator());
            }
        }

        public class UpdateDepartmentCommandHandler(ICustomerRepository _customerRepository, IMapper _mapper) : IRequestHandler<UpdateCustomerCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
            {
                var customer = await _customerRepository.GetByIdAsync(request.Customer.Id);
                if (customer is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Customer, customer);
                customer.UpdatedAt = DateTime.Now;

                var result = await _customerRepository.UpdateAsync(customer);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the customer. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
