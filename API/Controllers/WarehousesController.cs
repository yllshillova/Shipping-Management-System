using Application.Warehouses;
using Microsoft.AspNetCore.Mvc;
using static Application.Warehouses.Create;
using static Application.Warehouses.Delete;
using static Application.Warehouses.Details;
using static Application.Warehouses.Edit;
using static Application.Warehouses.List;

namespace API.Controllers
{
    public class WarehousesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetWarehouses()
        {
            return HandleResult(await Mediator.Send(new GetWarehousesQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetWarehouseById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetWarehouseByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateWarehouse([FromForm] WarehouseDto Warehouse)
        {
            return HandleResult(await Mediator.Send(new CreateWarehouseCommand(Warehouse)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditWarehouse(Guid Id,[FromForm] WarehouseDto Warehouse)
        {
            Warehouse.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateWarehouseCommand(Warehouse)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteWarehouse(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteWarehouseCommand(Id)));
        }
    }
}
