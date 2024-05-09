using Application.Core;
using Domain.Contracts;
using MediatR;

namespace Application.Products
{
    public class Delete
    {
        public record DeleteProductCommand(Guid Id) : IRequest<Result<Unit>>;

        public class DeleteProductCommandHandler(IProductRepository _productRepository) : IRequestHandler<DeleteProductCommand, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
            {
                var product = await _productRepository.GetByIdAsync(request.Id);
                if (product is null) return Result<Unit>.Failure(ErrorType.NotFound, "No records could be found.");

                var result = await _productRepository.DeleteAsync(product);

                if (!result) return Result<Unit>.Failure(ErrorType.BadRequest, "Failed to delete the product. Try again!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
