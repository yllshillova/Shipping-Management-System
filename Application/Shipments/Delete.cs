using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Shipments
{
    public class Delete
    {
        public record DeleteShipmentCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteShipmentCommandHandler(IShipmentRepository _shipmentRepository) : IRequestHandler<DeleteShipmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteShipmentCommand request, CancellationToken cancellationToken)
            {
                var shipment = await _shipmentRepository.GetByIdAsync(request.Id);
                if (shipment is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                var result = await _shipmentRepository.DeleteAsync(shipment);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the Shipment. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
