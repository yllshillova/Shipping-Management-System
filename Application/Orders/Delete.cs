using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Orders
{
    public class Delete
    {
        public record DeleteOrderCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteOrderCommandHandler(IOrderRepository _orderRepository) : IRequestHandler<DeleteOrderCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
            {
                var order = await _orderRepository.GetByIdAsync(request.Id);
                if (order is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                var result = await _orderRepository.DeleteAsync(order);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the Order. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
