using Application.Products;
using Microsoft.AspNetCore.Mvc;
using static Application.Products.Create;
using static Application.Products.Delete;
using static Application.Products.Details;
using static Application.Products.Edit;
using static Application.Products.List;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return HandleResult(await Mediator.Send(new GetProductsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetProductById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetProductByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] ProductDto Product)
        {
            return HandleResult(await Mediator.Send(new CreateProductCommand(Product)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditProduct(Guid Id,[FromForm] ProductDto Product)
        {
            Product.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateProductCommand(Product)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteProduct(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteProductCommand(Id)));
        }
    }
}
