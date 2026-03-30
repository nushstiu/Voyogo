using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/tours")]
public class TourController : ControllerBase
{
    private readonly ITourAction _action;

    public TourController(ITourAction action)
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
            return StatusCode(500, "Eroare la obtinerea tururilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var tour = await _action.GetById(id);
            if (tour == null) return NotFound("Turul nu a fost gasit.");
            return Ok(tour);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea turului: " + ex.Message);
        }
    }

    [HttpGet("destination/{destinationId:int}")]
    public async Task<IActionResult> GetByDestination(int destinationId)
    {
        try
        {
            return Ok(await _action.GetByDestinationId(destinationId));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea tururilor dupa destinatie: " + ex.Message);
        }
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TourDto dto)
    {
        try
        {
            if (dto == null)
                return BadRequest("Corpul cererii nu poate fi null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Created(string.Empty, await _action.Create(dto));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la crearea turului: " + ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TourDto dto)
    {
        try
        {
            if (dto == null)
                return BadRequest("Corpul cererii nu poate fi null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _action.Update(id, dto);
            if (updated == null) return NotFound("Turul nu a fost gasit.");
            return Ok(updated);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea turului: " + ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            if (!await _action.Delete(id)) return NotFound("Turul nu a fost gasit.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea turului: " + ex.Message);
        }
    }
}
