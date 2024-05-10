using Application.Core;
using AutoMapper;
using FluentValidation;
using MediatR;
using Domain.Contracts;
using Domain.Entities.OrderAggregate;
using Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Application.Orders
{
    public class Create
    {
        public record CreateOrderCommand(Guid BasketId, OrderDto Order) : IRequest<Result<Unit>>;

        public class CommandValidator : AbstractValidator<CreateOrderCommand>
        {
            public CommandValidator()
            {
                RuleFor(d => d.BasketId).NotNull().WithMessage("BasketId can not be null!");
                RuleFor(x => x.Order).SetValidator(new OrderValidator());
            }
        }
        public class CreateOrderCommandHandler(
                    IOrderRepository _orderRepository,
                    IBasketRepository _basketRepository,
                    IProductRepository _productRepository,
                    IMapper _mapper,
                    IHttpContextAccessor _httpContextAccessor
                ) : IRequestHandler<CreateOrderCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
            {
                var employerId = GetEmployerId();
                var basket = await _basketRepository.GetBasketByEmployerIdAsync(employerId);
                if (basket == null)
                {
                    return Result<Unit>.Failure(ErrorType.NotFound, "Basket not found.");
                }

                var orderItems = new List<OrderItem>();
                foreach (var basketItem in basket.Items)
                {
                    var product = await _productRepository.GetByIdAsync(basketItem.ProductId);
                    if (product == null)
                    {
                        return Result<Unit>.Failure(ErrorType.NotFound, $"Product not found for basket item: {basketItem.ProductId}");
                    }

                    var orderItem = new OrderItem
                    {
                        Quantity = basketItem.Quantity,
                        Price = basketItem.Price,
                        ProductId = product.Id,
                        Product = product
                    };

                    orderItems.Add(orderItem);

                    product.StockLevel -= basketItem.Quantity;
                }

                var subtotal = orderItems.Sum(item => item.Price * item.Quantity);


                var orderInput = _mapper.Map<Order>(request.Order);

                var order = new Order
                {
                    OrderDate = orderInput.OrderDate,
                    ShippingAddress = orderInput.ShippingAddress,
                    OrderStatus = orderInput.OrderStatus,
                    TotalAmount = subtotal,
                    CustomerId = orderInput.CustomerId,
                    Items = orderItems
                };

                var orderResult = await _orderRepository.CreateAsync(order);
                if (!orderResult)
                {
                    return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to create the order.");
                }

                await _basketRepository.DeleteAsync(basket);

                return Result<Unit>.Success(Unit.Value);
            }
            private string GetEmployerId()
            {
                return _httpContextAccessor.HttpContext?.Items["UserName"] as string;
            }
        }
    }
}
