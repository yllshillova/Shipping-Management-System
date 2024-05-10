using Microsoft.AspNetCore.Mvc;
using static Application.Baskets.AddItemToBasket;
using static Application.Baskets.RemoveBasketItem;
using static Application.Baskets.GetBasket;
using static Application.Baskets.Create;
using Application.Baskets;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetBasket()
        {
            return HandleResult(await Mediator.Send(new GetBasketQuery()));
        }

        [HttpPost]
        public async Task<IActionResult> AddItemToBasket(Guid productId, int quantity)
        {
            return HandleResult(await Mediator.Send(new AddItemToBasketCommand(productId, quantity)));
        }
        [HttpPost("createBasket")]
        public async Task<IActionResult> CreateBasket(BasketDto basket)
        {
            return HandleResult(await Mediator.Send(new CreateBasketCommand(basket)));
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveBasketItem(Guid productId, int quantity)
        {
            return HandleResult(await Mediator.Send(new RemoveBasketItemCommand(productId, quantity)));
        }
       
    }
}
