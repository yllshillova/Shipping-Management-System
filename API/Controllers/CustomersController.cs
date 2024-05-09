using Application.Costumers;
using Microsoft.AspNetCore.Mvc;
using static Application.Costumers.List;
using static Application.Customers.Create;
using static Application.Customers.Details;
using static Application.Departments.Delete;
using static Application.Departments.Edit;

namespace API.Controllers
{
    public class CustomersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            return HandleResult(await Mediator.Send(new GetCustomersQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCustomerById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetCustomerByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromForm] CustomerDto Customer)
        {
            return HandleResult(await Mediator.Send(new CreateCustomerCommand(Customer)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditCustomer(Guid Id,[FromForm] CustomerDto Customer)
        {
            Customer.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateCustomerCommand(Customer)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteCustomer(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteCustomerCommand(Id)));
        }
    }
}
