using Microsoft.EntityFrameworkCore;
using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class BookingActions
{
    internal List<Booking> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        var bookings = db.Bookings.Include(b => b.Tour).ToList();
        bookings.ForEach(b => b.TourName = b.Tour?.Name);
        return bookings;
    }

    internal Booking? ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        var booking = db.Bookings.Include(b => b.Tour).FirstOrDefault(b => b.Id == id);
        if (booking != null) booking.TourName = booking.Tour?.Name;
        return booking;
    }

    internal List<Booking> ExecuteGetByUserId(int userId)
    {
        using var db = new VoyagoContext();
        var bookings = db.Bookings.Include(b => b.Tour).Where(b => b.UserId == userId).ToList();
        bookings.ForEach(b => b.TourName = b.Tour?.Name);
        return bookings;
    }

    internal Booking ExecuteCreate(BookingDto dto)
    {
        using var db = new VoyagoContext();
        var booking = new Booking
        {
            UserId = dto.UserId,
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            Phone = dto.Phone,
            Destination = dto.Destination,
            TourId = dto.TourId,
            BookingDate = dto.BookingDate,
            Duration = dto.Duration,
            Status = dto.Status,
            Notes = dto.Notes,
            AdminNotes = dto.AdminNotes,
            CreatedAt = DateTime.UtcNow
        };
        db.Bookings.Add(booking);
        db.SaveChanges();
        if (booking.TourId.HasValue)
        {
            booking.Tour = db.Tours.FirstOrDefault(t => t.Id == booking.TourId.Value);
            booking.TourName = booking.Tour?.Name;
        }
        return booking;
    }

    internal Booking? ExecuteUpdateStatus(int id, string status)
    {
        using var db = new VoyagoContext();
        var booking = db.Bookings.Include(b => b.Tour).FirstOrDefault(b => b.Id == id);
        if (booking == null) return null;

        booking.Status = status;
        booking.UpdatedAt = DateTime.UtcNow;
        db.SaveChanges();
        booking.TourName = booking.Tour?.Name;
        return booking;
    }

    internal bool ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();
        var booking = db.Bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null) return false;

        db.Bookings.Remove(booking);
        db.SaveChanges();
        return true;
    }
}