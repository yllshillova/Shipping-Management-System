using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Baskets
{
    public class GetBasket
    {
        public record GetBasketQuery() : IRequest<Result<BasketDto>>;

        public class GetBasketByIdQueryHandler(IBasketRepository _basketRepository, IMapper _mapper, IHttpContextAccessor _httpContextAccessor) 
            : IRequestHandler<GetBasketQuery, Result<BasketDto>>
        {
            public async Task<Result<BasketDto>> Handle(GetBasketQuery request, CancellationToken cancellationToken)
            {
                var employerId = GetEmployerId();
                if (string.IsNullOrEmpty(employerId)) return Result<BasketDto>.Failure(ErrorType.NotFound, "Buyer ID is missing.");

                var basket = await _basketRepository.GetBasketByEmployerIdAsync(employerId);
                if (basket == null) return Result<BasketDto>.Failure(ErrorType.NotFound, "Basket not found.");

                var basketDto = _mapper.Map<BasketDto>(basket);

                return Result<BasketDto>.Success(basketDto);
            }
            private string GetEmployerId()
            {
                return _httpContextAccessor.HttpContext?.Items["UserName"] as string;
            }
        }
    }
}
