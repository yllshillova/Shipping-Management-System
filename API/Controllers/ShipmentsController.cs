using Application.Shipments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Application.Shipments.Create;
using static Application.Shipments.Delete;
using static Application.Shipments.Details;
using static Application.Shipments.Edit;
using static Application.Shipments.List;

namespace API.Controllers
{
    public class ShipmentsController : BaseApiController
    {
        [Authorize(Roles = "Admin,Manager")]
        [HttpGet]
        public async Task<IActionResult> GetShipments()
        {
            return HandleResult(await Mediator.Send(new GetShipmentsQuery()));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetShipmentById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetShipmentByIdQuery(Id)));
        }


        [Authorize(Roles = "Admin,Manager")]
        [HttpPost]
        public async Task<IActionResult> CreateShipment([FromForm] ShipmentDto Shipment)
        {
            return HandleResult(await Mediator.Send(new CreateShipmentCommand(Shipment)));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpPut("{Id}")]
        public async Task<IActionResult> EditShipment(Guid Id,[FromForm] ShipmentDto Shipment)
        {
            Shipment.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateShipmentCommand(Shipment)));
        }

        [Authorize(Roles = "Admin,Manager")]
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteShipment(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteShipmentCommand(Id)));
        }
    }
}
