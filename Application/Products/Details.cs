using Application.Core;
using AutoMapper;
using Domain.Contracts;
using MediatR;

namespace Application.Products
{
    public class Details
    {
        public record GetProductByIdQuery(Guid Id) : IRequest<Result<ProductDto>>;

        public class GetProductByIdQueryHandler(IProductRepository _productRepository, IMapper _mapper) : IRequestHandler<GetProductByIdQuery, Result<ProductDto>>
        {
            public async Task<Result<ProductDto>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
            {
                if (request.Id != Guid.Empty)
                {
                    var product = await _productRepository.GetByIdAsync(request.Id);
                    if (product is null) return Result<ProductDto>.Failure(ErrorType.NotFound, "No records could be found.");

                    var productDto = _mapper.Map<ProductDto>(product);
                    if (productDto is null) return Result<ProductDto>.Failure(ErrorType.NotFound, "Problem while mapping between entities/dto");

                    return Result<ProductDto>.Success(productDto);

                }
                return Result<ProductDto>.Failure(ErrorType.BadRequest, "Something went wrong, the request couldn't be processed");
            }
        }
    }
}
