using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Shipments
{
    public class Details
    {
        public record GetShipmentByIdQuery(Guid Id) : IRequest<Result<ShipmentDto>>;

        public class GetShipmentByIdQueryHandler(IShipmentRepository _shipmentRepository, IMapper _mapper) : IRequestHandler<GetShipmentByIdQuery, Result<ShipmentDto>>
        {
            public async Task<Result<ShipmentDto>> Handle(GetShipmentByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var shipment = await _shipmentRepository.GetByIdAsync(request.Id);
                    if (shipment is null) return Result<ShipmentDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var shipmentDto = _mapper.Map<ShipmentDto>(shipment);
                    if (shipmentDto is null) return Result<ShipmentDto>.Failure(ErrorType.NotFound, "Problem while mapping between entities/dto");

                    return Result<ShipmentDto>.Success(shipmentDto);

                }
                return Result<ShipmentDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
