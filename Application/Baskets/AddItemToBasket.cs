using Application.Core;
using AutoMapper;
using Azure.Core;
using Domain.Contracts;
using Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Net.Http;

namespace Application.Baskets
{
    public class AddItemToBasket
    {
        public record AddItemToBasketCommand(Guid ProductId, int Quantity) : IRequest<Result<BasketDto>>;

        public class CommandValidator : AbstractValidator<AddItemToBasketCommand>
        {
            public CommandValidator()
            {
                RuleFor(d => d.ProductId).NotNull().WithMessage("ProductId can not be null!");
                RuleFor(d => d.Quantity)
                    .NotNull()
                    .WithMessage("ProductId can not be null!")
                    .GreaterThan(0)
                    .WithMessage("Quantity must be greater than zero.");
            }
        }

        public class AddItemToBasketCommandHandler(IBasketRepository _basketRepository,
                                                    IProductRepository _productRepository,
                                                    IMapper _mapper,
                                                     IHttpContextAccessor _httpContextAccessor)
                                                    : IRequestHandler<AddItemToBasketCommand, Result<BasketDto>>
        {
            public async Task<Result<BasketDto>> Handle(AddItemToBasketCommand request, CancellationToken cancellationToken)
            {
                var employerId = GetEmployerId();
                if (string.IsNullOrEmpty(employerId)) return Result<BasketDto>.Failure(ErrorType.NotFound, "Employer ID is missing.");


                var basket = await _basketRepository.GetBasketByEmployerIdAsync(employerId);

                if (basket == null)
                {
                    basket = CreateBasket(employerId);
                    await _basketRepository.CreateAsync(basket);
                }

                var product = await _productRepository.GetByIdAsync(request.ProductId);
                if (product == null) return Result<BasketDto>.Failure(ErrorType.NotFound, "Product not found.");

                var result = await _basketRepository.AddItemAsync(basket.EmployerId, product.Id, request.Quantity);
                basket.CreatedAt = DateTime.UtcNow;
                basket.UpdatedAt = basket.CreatedAt;

                if (!result)
                {
                    return Result<BasketDto>.Failure(ErrorType.BadRequest, "Failed to add item to basket");
                }

                var basketDto = _mapper.Map<BasketDto>(basket);
                return Result<BasketDto>.Success(basketDto);
            }
            private Basket CreateBasket(string employerId)
            {
                return new Basket
                {
                    EmployerId = employerId,
                    Items = new List<BasketItem>(),
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };
            }
            private string GetEmployerId()
            {
                return _httpContextAccessor.HttpContext?.Items["UserName"] as string;
            }
        }
    }
}
