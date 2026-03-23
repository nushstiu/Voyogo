using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces; 
using Voyago.DataAccessLayer.Context;
using Microsoft.EntityFrameworkCore;

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
    public IActionResult GetAll() => Ok(_action.GetAll());

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var booking = _action.GetById(id);
        if (booking == null) return NotFound();
        return Ok(booking);
    }

    [HttpGet("user/{userId:guid}")]
    public IActionResult GetByUser(Guid userId) => Ok(_action.GetByUserId(userId));

    [HttpPost]
    public IActionResult Create([FromBody] BookingDto dto)
    {
        var created = _action.Create(dto);
        return Created(string.Empty, created);
    }

    [HttpPatch("{id:guid}/status")]
    public IActionResult UpdateStatus(Guid id, [FromBody] UpdateStatusDto dto)
    {
        var updated = _action.UpdateStatus(id, dto.Status);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, [FromBody] UpdateBookingDto dto)
    {
        using var db = new VoyagoContext();

        var booking = db.Bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null) return NotFound();

        booking.UserId = dto.UserId;
        booking.Name = dto.Name;
        booking.Surname = dto.Surname;
        booking.Email = dto.Email;
        booking.Phone = dto.Phone;
        booking.Destination = dto.Destination;
        booking.TourId = dto.TourId;
        booking.TourName = dto.TourName;
        booking.BookingDate = dto.BookingDate;
        booking.Duration = dto.Duration;
        booking.Status = dto.Status;
        booking.Notes = dto.Notes;
        booking.AdminNotes = dto.AdminNotes;
        booking.UpdatedAt = DateTime.UtcNow;

        db.SaveChanges();

        return Ok(booking);
    }
    
    
    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        if (!_action.Delete(id)) return NotFound();
        return NoContent();
    }
}
