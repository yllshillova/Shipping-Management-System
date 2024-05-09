using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Shipments
{
    public class List
    {
        public record GetShipmentsQuery : IRequest<Result<IEnumerable<ShipmentDto>>>;

        public class GetShipmentsQueryHandler(IShipmentRepository _shipmentRepository, IMapper _mapper) : IRequestHandler<GetShipmentsQuery, Result<IEnumerable<ShipmentDto>>>
        {
            public async Task<Result<IEnumerable<ShipmentDto>>> Handle(GetShipmentsQuery request, CancellationToken cancellationToken)
            {
                var shipments = await _shipmentRepository.GetAllAsync();
                if (shipments is null || !shipments.Any()) return Result<IEnumerable<ShipmentDto>>.Failure(ErrorType.NotFound, "No records could be found.");

                var shipmentDtos = _mapper.Map<IEnumerable<ShipmentDto>>(shipments);
                if (shipmentDtos is null) return Result<IEnumerable<ShipmentDto>>.Failure(ErrorType.BadRequest, "Problem while mapping between entity/dto.");

                return Result<IEnumerable<ShipmentDto>>.Success(shipmentDtos);
            }
        }
    }
}
