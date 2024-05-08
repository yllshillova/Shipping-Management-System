using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Departments
{
    public class Delete
    {
        public record DeleteCustomerCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteCustomerHandler(ICustomerRepository _customerRepository) : IRequestHandler<DeleteCustomerCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteCustomerCommand request, CancellationToken cancellationToken)
            {
                var customer = await _customerRepository.GetByIdAsync(request.Id);
                if (customer is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                var result = await _customerRepository.DeleteAsync(customer);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the department. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
