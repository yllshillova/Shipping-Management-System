using Application.Core;
using Application.Costumers;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Customers
{
    public class Details
    {
        public record GetCustomerByIdQuery(Guid Id) : IRequest<Result<CustomerDto>>;

        public class GetCustomerByIdQueryHandler(ICustomerRepository _customerRepository, IMapper _mapper) : IRequestHandler<GetCustomerByIdQuery, Result<CustomerDto>>
        {
            public async Task<Result<CustomerDto>> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var customer = await _customerRepository.GetByIdAsync(request.Id);
                    if (customer is null) return Result<CustomerDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var customerDto = _mapper.Map<CustomerDto>(customer);
                    if (customerDto is null) return Result<CustomerDto>.Failure(ErrorType.NotFound, "Problem while mapping between entities/dto");

                    return Result<CustomerDto>.Success(customerDto);

                }
                return Result<CustomerDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
