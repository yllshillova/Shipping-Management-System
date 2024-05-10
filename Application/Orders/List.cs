using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Orders
{
    public class List
    {
        public record GetOrdersQuery : IRequest<Result<IEnumerable<OrderDto>>>;

        public class GetOrdersQueryHandler(IOrderRepository _orderRepository, IMapper _mapper) : IRequestHandler<GetOrdersQuery, Result<IEnumerable<OrderDto>>>
        {
            public async Task<Result<IEnumerable<OrderDto>>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
            {
                var orders = await _orderRepository.GetAllAsync(o => o.Items);
                if (orders is null || !orders.Any()) return Result<IEnumerable<OrderDto>>.Failure(ErrorType.NotFound, "No records could be found.");

                var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
                if (orderDtos is null) return Result<IEnumerable<OrderDto>>.Failure(ErrorType.BadRequest, "Problem while mapping between entity/dto.");

                return Result<IEnumerable<OrderDto>>.Success(orderDtos);
            }
        }
    }
}
