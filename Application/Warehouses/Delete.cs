using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Warehouses
{
    public class Delete
    {
        public record DeleteWarehouseCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteWarehouseCommandHandler(IWarehouseRepository _warehouseRepository) : IRequestHandler<DeleteWarehouseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteWarehouseCommand request, CancellationToken cancellationToken)
            {
                var warehouse = await _warehouseRepository.GetByIdAsync(request.Id);
                if (warehouse is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                var result = await _warehouseRepository.DeleteAsync(warehouse);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the warehouse. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
