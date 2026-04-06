using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/bookings")]
[Authorize]
public class BookingController : ControllerBase
{
    private readonly BusinessLogic _bl;

    public BookingController(BusinessLogic bl)
    {
        _bl = bl;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            return Ok(await _bl.BookingAction().GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea rezervarilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var booking = await _bl.BookingAction().GetById(id);
            if (booking == null) return NotFound("Rezervarea nu a fost gasita.");
            return Ok(booking);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea rezervarii: " + ex.Message);
        }
    }

    [HttpGet("user/{userId:int}")]
    public async Task<IActionResult> GetByUser(int userId)
    {
        try
        {
            return Ok(await _bl.BookingAction().GetByUserId(userId));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea rezervarilor utilizatorului: " + ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BookingDto dto)
    {
        try
        {
            if (dto == null)
                return BadRequest("Corpul cererii nu poate fi null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Created(string.Empty, await _bl.BookingAction().Create(dto));
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la crearea rezervarii: " + ex.Message);
        }
    }

    [HttpPatch("{id:int}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        try
        {
            if (dto == null)
                return BadRequest("Corpul cererii nu poate fi null.");

            // Validate status enum
            var validStatuses = new[] { "pending", "confirmed", "cancelled" };
            if (!validStatuses.Contains(dto.Status.ToLower()))
                return BadRequest($"Status invalid. Valori permise: {string.Join(", ", validStatuses)}");

            var updated = await _bl.BookingAction().UpdateStatus(id, dto.Status);
            if (updated == null) return NotFound("Rezervarea nu a fost gasita.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea statusului rezervarii: " + ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            if (!await _bl.BookingAction().Delete(id)) return NotFound("Rezervarea nu a fost gasita.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea rezervarii: " + ex.Message);
        }
    }
}