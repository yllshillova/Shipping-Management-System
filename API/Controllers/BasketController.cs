using Microsoft.AspNetCore.Mvc;
using static Application.Baskets.AddItemToBasket;
using static Application.Baskets.RemoveBasketItem;
using static Application.Baskets.GetBasket;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {

        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpGet]
        public async Task<IActionResult> GetBasket()
        {
            return HandleResult(await Mediator.Send(new GetBasketQuery()));
        }

        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpPost]
        public async Task<IActionResult> AddItemToBasket(Guid productId, int quantity)
        {
            return HandleResult(await Mediator.Send(new AddItemToBasketCommand(productId, quantity)));
        }

        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpDelete]
        public async Task<IActionResult> RemoveBasketItem(Guid productId, int quantity)
        {
            return HandleResult(await Mediator.Send(new RemoveBasketItemCommand(productId, quantity)));
        }
       
    }
}
