using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;
using Domain.Entities;

namespace Application.Baskets
{
    public class Create
    {
        public record CreateBasketCommand(BasketDto Basket) : IRequest<Result<Unit>>;
       
        public class CreateBasketCommandHandler(IBasketRepository _basketRepository, IMapper _mapper) : IRequestHandler<CreateBasketCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateBasketCommand request, CancellationToken cancellationToken)
            {
                if (request.Basket is null) return Result<Unit>.Failure(ErrorType.BadRequest, "Couldn't complete the action! Try again!");

                var basket = _mapper.Map<Basket>(request.Basket);
                if (basket is null) return Result<Unit>.Failure(ErrorType.NotFound, "Problem while mapping between entity/dto.");

                basket.CreatedAt = DateTime.Now;
                basket.UpdatedAt = basket.CreatedAt;

                var result = await _basketRepository.CreateAsync(basket);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the Basket! Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
