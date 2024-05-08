using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Costumers
{
    public class List
    {
        public record GetCustomersQuery : IRequest<Result<IEnumerable<CustomerDto>>>;

        public class GetCustomerQueryHandler(ICustomerRepository _customerRepository, IMapper _mapper) : IRequestHandler<GetCustomersQuery, Result<IEnumerable<CustomerDto>>>
        {
            public async Task<Result<IEnumerable<CustomerDto>>> Handle(GetCustomersQuery request, CancellationToken cancellationToken)
            {
                var customers = await _customerRepository.GetAllAsync();
                if (customers is null || !customers.Any()) return Result<IEnumerable<CustomerDto>>.Failure(ErrorType.NotFound, "No records could be found.");

                var customerDtos = _mapper.Map<IEnumerable<CustomerDto>>(customers);
                if (customerDtos is null) return Result<IEnumerable<CustomerDto>>.Failure(ErrorType.BadRequest, "Problem while mapping between entity/dto.");

                return Result<IEnumerable<CustomerDto>>.Success(customerDtos);
            }
        }
    }
}
