using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Shipments
{
    public class Edit
    {
        public record UpdateShipmentCommand(ShipmentDto Shipment) : IRequest<Result<Unit>>;

        public class UpdateShipmentCommandValidator : AbstractValidator<UpdateShipmentCommand>
        {
            public UpdateShipmentCommandValidator()
            {
                RuleFor(x => x.Shipment).SetValidator(new ShipmentValidator());
            }
        }

        public class UpdateShipmentCommandHandler(IShipmentRepository _shipmentRepository, IMapper _mapper) : IRequestHandler<UpdateShipmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateShipmentCommand request, CancellationToken cancellationToken)
            {
                var shipment = await _shipmentRepository.GetByIdAsync(request.Shipment.Id);
                if (shipment is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                request.Shipment.CreatedAt = shipment.CreatedAt;

                _mapper.Map(request.Shipment, shipment);
                shipment.UpdatedAt = DateTime.Now;

                var result = await _shipmentRepository.UpdateAsync(shipment);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the Shipment. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
