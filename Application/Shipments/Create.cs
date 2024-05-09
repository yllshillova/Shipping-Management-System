using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Domain.Contracts;
using Domain.Entities;

namespace Application.Shipments
{
    public class Create
    {
        public record CreateShipmentCommand(ShipmentDto Shipment) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateShipmentCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Shipment).SetValidator(new ShipmentValidator());
            }
        }

        public class CreateShipmentCommandHandler(IShipmentRepository _shipmentRepository, IMapper _mapper) : IRequestHandler<CreateShipmentCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateShipmentCommand request, CancellationToken cancellationToken)
            {
                if (request.Shipment is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var shipment = _mapper.Map<Shipment>(request.Shipment);
                if (shipment is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                shipment.CreatedAt = DateTime.Now;
                shipment.UpdatedAt = shipment.CreatedAt;

                var result = await _shipmentRepository.CreateAsync(shipment);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Shipment! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
