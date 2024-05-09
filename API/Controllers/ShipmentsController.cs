using Application.Shipments;
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
        [HttpGet]
        public async Task<IActionResult> GetShipments()
        {
            return HandleResult(await Mediator.Send(new GetShipmentsQuery()));
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> GetShipmentById(Guid Id)
        {
            return HandleResult(await Mediator.Send(new GetShipmentByIdQuery(Id)));
        }


        [HttpPost]
        public async Task<IActionResult> CreateShipment([FromForm] ShipmentDto Shipment)
        {
            return HandleResult(await Mediator.Send(new CreateShipmentCommand(Shipment)));
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> EditShipment(Guid Id,[FromForm] ShipmentDto Shipment)
        {
            Shipment.Id = Id;
            return HandleResult(await Mediator.Send(new UpdateShipmentCommand(Shipment)));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteShipment(Guid Id)
        {
            return HandleResult(await Mediator.Send(new DeleteShipmentCommand(Id)));
        }
    }
}
