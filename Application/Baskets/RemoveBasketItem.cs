using Application.Core;
using Domain.Contracts;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Baskets
{
    public class RemoveBasketItem
    {
        public record RemoveBasketItemCommand(Guid ProductId, int Quantity) : IRequest<Result<Unit>>;

        public class RemoveBasketItemCommandHandler(IBasketRepository _basketRepository,
            IProductRepository _productRepository,
             IHttpContextAccessor _httpContextAccessor)
            : IRequestHandler<RemoveBasketItemCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(RemoveBasketItemCommand request, CancellationToken cancellationToken)
            {
                var employerId = GetEmployerId();
                if (string.IsNullOrEmpty(employerId)) return Result<Unit>.Failure(ErrorType.NotFound, "Employer ID is missing.");

                var basket = await _basketRepository.GetBasketByEmployerIdAsync(employerId);
                if (basket == null)
                {
                    return Result<Unit>.Failure(ErrorType.NotFound, "Basket not found or could not be created.");
                }

                var product = await _productRepository.GetByIdAsync(request.ProductId);
                if (product == null)
                {
                    return Result<Unit>.Failure(ErrorType.NotFound, "Product not found");
                }
                
                var result = await _basketRepository.RemoveItemAsync(basket.EmployerId, product.Id, request.Quantity);
                if (!result)
                {
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to remove basket item!");
                }

                return Result<Unit>.Success(Unit.Value);
            }
            private string GetEmployerId()
            {
                return _httpContextAccessor.HttpContext?.Items["UserName"] as string;
            }
        }
    }
}
