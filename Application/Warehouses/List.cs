using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Warehouses
{
    public class List
    {
        public record GetWarehousesQuery : IRequest<Result<IEnumerable<WarehouseDto>>>;

        public class GetWarehousesQueryHandler(IWarehouseRepository _warehouseRepository, IMapper _mapper) : IRequestHandler<GetWarehousesQuery, Result<IEnumerable<WarehouseDto>>>
        {
            public async Task<Result<IEnumerable<WarehouseDto>>> Handle(GetWarehousesQuery request, CancellationToken cancellationToken)
            {
                var warehouses = await _warehouseRepository.GetAllAsync();
                if (warehouses is null || !warehouses.Any()) return Result<IEnumerable<WarehouseDto>>.Failure(ErrorType.NotFound, "No records could be found.");

                var warehouseDtos = _mapper.Map<IEnumerable<WarehouseDto>>(warehouses);
                if (warehouseDtos is null) return Result<IEnumerable<WarehouseDto>>.Failure(ErrorType.BadRequest, "Problem while mapping between entity/dto.");

                return Result<IEnumerable<WarehouseDto>>.Success(warehouseDtos);
            }
        }
    }
}
