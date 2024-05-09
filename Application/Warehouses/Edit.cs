using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Warehouses
{
    public class Edit
    {
        public record UpdateWarehouseCommand(WarehouseDto Warehouse) : IRequest<Result<Unit>>;

        public class UpdateWarehouseCommandValidator : AbstractValidator<UpdateWarehouseCommand>
        {
            public UpdateWarehouseCommandValidator()
            {
                RuleFor(x => x.Warehouse).SetValidator(new WarehouseValidator());
            }
        }
        public class UpdateWarehouseCommandHandler(IWarehouseRepository _warehouseRepository, IMapper _mapper) : IRequestHandler<UpdateWarehouseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateWarehouseCommand request, CancellationToken cancellationToken)
            {
                var warehouse = await _warehouseRepository.GetByIdAsync(request.Warehouse.Id);
                if (warehouse is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                _mapper.Map(request.Warehouse, warehouse);
                warehouse.UpdatedAt = DateTime.Now;

                var result = await _warehouseRepository.UpdateAsync(warehouse);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the warehouse. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}