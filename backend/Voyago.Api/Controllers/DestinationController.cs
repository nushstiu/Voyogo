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
    public IActionResult GetAll()
    {
        try
        {
            return Ok(_action.GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea destinatiilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        try
        {
            var dest = _action.GetById(id);
            if (dest == null) return NotFound("Destinatia nu a fost gasita.");
            return Ok(dest);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea destinatiei: " + ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create([FromBody] DestinationDto dto)
    {
        try
        {
            return Created(string.Empty, _action.Create(dto));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la crearea destinatiei: " + ex.Message);
        }
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] DestinationDto dto)
    {
        try
        {
            var updated = _action.Update(id, dto);
            if (updated == null) return NotFound("Destinatia nu a fost gasita.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea destinatiei: " + ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        try
        {
            if (!_action.Delete(id)) return NotFound("Destinatia nu a fost gasita.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea destinatiei: " + ex.Message);
        }
    }
}