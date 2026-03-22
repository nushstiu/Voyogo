using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/destinations")]
public class DestinationController : ControllerBase
{
    private readonly IDestinationAction _action;

    public DestinationController()
    {
        var bl = new BusinessLogic();
        _action = bl.DestinationAction();
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_action.GetAll());

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        var dest = _action.GetById(id);
        if (dest == null) return NotFound();
        return Ok(dest);
    }

    [HttpPost]
    public IActionResult Create([FromBody] DestinationDto dto)
    {
        var created = _action.Create(dto);
        return Created(string.Empty, created);
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] DestinationDto dto)
    {
        var updated = _action.Update(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        if (!_action.Delete(id)) return NotFound();
        return NoContent();
    }
}
