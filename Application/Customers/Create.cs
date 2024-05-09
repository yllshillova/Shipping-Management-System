using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Application.Costumers;
using Domain.Contracts;
using Domain.Entities;

namespace Application.Customers
{
    public class Create
    {
        public record CreateCustomerCommand(CustomerDto Customer) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateCustomerCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Customer).SetValidator(new CustomerValidator());
            }
        }

        public class CreateWarehouseCommandHandler(ICustomerRepository _customerRepository, IMapper _mapper) : IRequestHandler<CreateCustomerCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
            {
                if (request.Customer is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var customer = _mapper.Map<Customer>(request.Customer);
                if (customer is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                customer.CreatedAt = DateTime.Now;
                customer.UpdatedAt = customer.CreatedAt;

                var result = await _customerRepository.CreateAsync(customer);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the customer! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
