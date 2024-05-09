using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Warehouses
{
    public class Details
    {
        public record GetWarehouseByIdQuery(Guid Id) : IRequest<Result<WarehouseDto>>;

        public class GetWarehouseByIdQueryHandler(IWarehouseRepository _warehouseRepository, IMapper _mapper) : IRequestHandler<GetWarehouseByIdQuery, Result<WarehouseDto>>
        {
            public async Task<Result<WarehouseDto>> Handle(GetWarehouseByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var warehouse = await _warehouseRepository.GetByIdAsync(request.Id);
                    if (warehouse is null) return Result<WarehouseDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var warehouseDto = _mapper.Map<WarehouseDto>(warehouse);
                    if (warehouseDto is null) return Result<WarehouseDto>.Failure(ErrorType.NotFound, "Problem while mapping between entities/dto");

                    return Result<WarehouseDto>.Success(warehouseDto);

                }
                return Result<WarehouseDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}