using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/bookings")]
public class BookingController : ControllerBase
{
    private readonly IBookingAction _action;

    public BookingController()
    {
        var bl = new BusinessLogic();
        _action = bl.BookingAction();
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
            return StatusCode(500, "Eroare la obtinerea rezervarilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        try
        {
            var booking = _action.GetById(id);
            if (booking == null) return NotFound("Rezervarea nu a fost gasita.");
            return Ok(booking);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea rezervarii: " + ex.Message);
        }
    }

    [HttpGet("user/{userId:int}")]
    public IActionResult GetByUser(int userId)
    {
        try
        {
            return Ok(_action.GetByUserId(userId));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea rezervarilor utilizatorului: " + ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create([FromBody] BookingDto dto)
    {
        try
        {
            return Created(string.Empty, _action.Create(dto));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la crearea rezervarii: " + ex.Message);
        }
    }

    [HttpPatch("{id:int}/status")]
    public IActionResult UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        try
        {
            var updated = _action.UpdateStatus(id, dto.Status);
            if (updated == null) return NotFound("Rezervarea nu a fost gasita.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea statusului rezervarii: " + ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        try
        {
            if (!_action.Delete(id)) return NotFound("Rezervarea nu a fost gasita.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea rezervarii: " + ex.Message);
        }
    }
}