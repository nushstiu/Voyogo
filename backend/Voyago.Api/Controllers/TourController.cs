using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/tours")]
public class TourController : ControllerBase
{
    private readonly ITourAction _action;

    public TourController()
    {
        var bl = new BusinessLogic();
        _action = bl.TourAction();
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_action.GetAll());

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var tour = _action.GetById(id);
        if (tour == null) return NotFound();
        return Ok(tour);
    }

    [HttpGet("destination/{destinationId:int}")]
    public IActionResult GetByDestination(int destinationId) => Ok(_action.GetByDestinationId(destinationId));

    [HttpPost]
    public IActionResult Create([FromBody] TourDto dto)
    {
        var created = _action.Create(dto);
        return Created(string.Empty, created);
    }

    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, [FromBody] TourDto dto)
    {
        var updated = _action.Update(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        if (!_action.Delete(id)) return NotFound();
        return NoContent();
    }
}
