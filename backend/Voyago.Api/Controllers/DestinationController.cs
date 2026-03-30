using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/destinations")]
public class DestinationController : ControllerBase
{
    private readonly IDestinationAction _action;

    public DestinationController(IDestinationAction action)
    {
        _action = action;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            return Ok(await _action.GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea destinatiilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var dest = await _action.GetById(id);
            if (dest == null) return NotFound("Destinatia nu a fost gasita.");
            return Ok(dest);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea destinatiei: " + ex.Message);
        }
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] DestinationDto dto)
    {
        try
        {
            if (dto == null)
                return BadRequest("Corpul cererii nu poate fi null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Created(string.Empty, await _action.Create(dto));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la crearea destinatiei: " + ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] DestinationDto dto)
    {
        try
        {
            if (dto == null)
                return BadRequest("Corpul cererii nu poate fi null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _action.Update(id, dto);
            if (updated == null) return NotFound("Destinatia nu a fost gasita.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea destinatiei: " + ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            if (!await _action.Delete(id)) return NotFound("Destinatia nu a fost gasita.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea destinatiei: " + ex.Message);
        }
    }
}
