using Application.Costumers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Application.Costumers.List;
using static Application.Customers.Create;
using static Application.Customers.Delete;
using static Application.Customers.Details;
using static Application.Customers.Edit;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {

        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            return HandleResult(await Mediator.Send(new GetCustomersQuery()));
        }

        [Authorize(Roles = "Admin,Manager,Employer")]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCustomerById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetCustomerByIdQuery(Id)));
        }


        [Authorize(Roles = "Admin,Manager")]
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromForm] CustomerDto Customer)
        {
            return HandleResult(await Mediator.Send(new CreateCustomerCommand(Customer)));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditCustomer(Guid Id,[FromForm] CustomerDto Customer)
        {
            Customer.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateCustomerCommand(Customer)));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteCustomer(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteCustomerCommand(Id)));
        }
    }
}
