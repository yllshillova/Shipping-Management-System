using Application.Orders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Application.Orders.Create;
using static Application.Orders.Delete;
using static Application.Orders.Details;
using static Application.Orders.Edit;
using static Application.Orders.List;

namespace API.Controllers
{
    public class OrdersController : BaseApiController
    {
        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            return HandleResult(await Mediator.Send(new GetOrdersQuery()));
        }

        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetOrderById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetOrderByIdQuery(Id)));
        }


        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto Order)
        {
            return HandleResult(await Mediator.Send(new CreateOrderCommand(Order)));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteOrder(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteOrderCommand(Id)));
        }
    }
}
