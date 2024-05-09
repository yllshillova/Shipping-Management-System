using Application.Core;
using AutoMapper;
using Domain.Contracts;
using FluentValidation;
using MediatR;

namespace Application.Products
{
    public class Edit
    {
        public record UpdateProductCommand(ProductDto Product) : IRequest<Result<Unit>>;

        public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
        {
            public UpdateProductCommandValidator()
            {
                RuleFor(x => x.Product).SetValidator(new ProductValidator());
            }
        }

        public class UpdateProductCommandHandler(IProductRepository _productRepository, IMapper _mapper) : IRequestHandler<UpdateProductCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _productRepository.GetByIdAsync(request.Product.Id);
                if (product is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                request.Product.CreatedAt = product.CreatedAt;

                _mapper.Map(request.Product, product);
                product.UpdatedAt = DateTime.Now;

                var result = await _productRepository.UpdateAsync(product);
                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to update the product. Try again!");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
