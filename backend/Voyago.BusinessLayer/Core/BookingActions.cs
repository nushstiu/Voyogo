using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class BookingActions
{
    internal List<Booking> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return db.Bookings.ToList();
    }

    internal Booking? ExecuteGetById(Guid id)
    {
        using var db = new VoyagoContext();
        return db.Bookings.FirstOrDefault(b => b.Id == id);
    }

    internal List<Booking> ExecuteGetByUserId(Guid userId)
    {
        using var db = new VoyagoContext();
        return db.Bookings.Where(b => b.UserId == userId).ToList();
    }

    internal Booking ExecuteCreate(BookingDto dto)
    {
        using var db = new VoyagoContext();
        var booking = new Booking
        {
            Id = Guid.NewGuid(),
            UserId = dto.UserId,
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            Phone = dto.Phone,
            Destination = dto.Destination,
            TourId = dto.TourId,
            TourName = dto.TourName,
            BookingDate = dto.BookingDate,
            Duration = dto.Duration,
            Status = dto.Status,
            Notes = dto.Notes,
            AdminNotes = dto.AdminNotes,
            CreatedAt = DateTime.UtcNow
        };
        db.Bookings.Add(booking);
        db.SaveChanges();
        return booking;
    }

    internal Booking? ExecuteUpdateStatus(Guid id, string status)
    {
        using var db = new VoyagoContext();
        var booking = db.Bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null) return null;

        booking.Status = status;
        booking.UpdatedAt = DateTime.UtcNow;

        db.SaveChanges();
        return booking;
    }

    internal bool ExecuteDelete(Guid id)
    {
        using var db = new VoyagoContext();
        var booking = db.Bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null) return false;

        db.Bookings.Remove(booking);
        db.SaveChanges();
        return true;
    }
}
