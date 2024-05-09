using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Domain.Contracts;
using Domain.Entities;

namespace Application.Warehouses
{
    public class Create
    {
        public record CreateWarehouseCommand(WarehouseDto Warehouse) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateWarehouseCommand>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Warehouse).SetValidator(new WarehouseValidator());
            }
        }

        public class CreateWarehouseCommandHandler(IWarehouseRepository _warehouseRepository, IMapper _mapper) : IRequestHandler<CreateWarehouseCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateWarehouseCommand request, CancellationToken cancellationToken)
            {
                if (request.Warehouse is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var warehouse = _mapper.Map<Warehouse>(request.Warehouse);
                if (warehouse is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                warehouse.CreatedAt = DateTime.Now;
                warehouse.UpdatedAt = warehouse.CreatedAt;

                var result = await _warehouseRepository.CreateAsync(warehouse);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the warehouse! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}