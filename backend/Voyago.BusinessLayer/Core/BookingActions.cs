using Microsoft.EntityFrameworkCore;
using Voyago.Domain.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class BookingActions
{
    internal async Task<List<Booking>> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        var bookings = await db.Bookings.Include(b => b.Tour).ToListAsync();
        bookings.ForEach(b => b.TourName = b.Tour?.Name);
        return bookings;
    }

    internal async Task<Booking?> ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        var booking = await db.Bookings.Include(b => b.Tour).FirstOrDefaultAsync(b => b.Id == id);
        if (booking != null) booking.TourName = booking.Tour?.Name;
        return booking;
    }

    internal async Task<List<Booking>> ExecuteGetByUserId(int userId)
    {
        using var db = new VoyagoContext();
        var bookings = await db.Bookings.Include(b => b.Tour).Where(b => b.UserId == userId).ToListAsync();
        bookings.ForEach(b => b.TourName = b.Tour?.Name);
        return bookings;
    }

    internal async Task<Booking> ExecuteCreate(BookingDto dto)
    {
        using var db = new VoyagoContext();

        // Validate foreign key: TourId must exist if provided
        if (dto.TourId.HasValue)
        {
            var tourExists = await db.Tours.AnyAsync(t => t.Id == dto.TourId.Value);
            if (!tourExists)
            {
                throw new InvalidOperationException($"Turul cu ID-ul {dto.TourId.Value} nu exista.");
            }
        }

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
        await db.SaveChangesAsync();
        if (booking.TourId.HasValue)
        {
            booking.Tour = await db.Tours.FirstOrDefaultAsync(t => t.Id == booking.TourId.Value);
            booking.TourName = booking.Tour?.Name;
        }
        return booking;
    }

    internal async Task<Booking?> ExecuteUpdate(int id, BookingDto dto)
    {
        using var db = new VoyagoContext();
        var booking = await db.Bookings.FirstOrDefaultAsync(b => b.Id == id);
        if (booking == null) return null;

        if (dto.TourId.HasValue)
        {
            var tourExists = await db.Tours.AnyAsync(t => t.Id == dto.TourId.Value);
            if (!tourExists)
            {
                throw new InvalidOperationException($"Turul cu ID-ul {dto.TourId.Value} nu exista.");
            }
        }

        booking.Name = dto.Name;
        booking.Surname = dto.Surname;
        booking.Email = dto.Email;
        booking.Phone = dto.Phone;
        booking.Destination = dto.Destination;
        booking.TourId = dto.TourId;
        booking.BookingDate = dto.BookingDate;
        booking.Duration = dto.Duration;
        booking.Status = dto.Status;
        booking.Notes = dto.Notes;
        booking.AdminNotes = dto.AdminNotes;
        booking.UpdatedAt = DateTime.UtcNow;

        await db.SaveChangesAsync();
        if (booking.TourId.HasValue)
        {
            booking.Tour = await db.Tours.FirstOrDefaultAsync(t => t.Id == booking.TourId.Value);
            booking.TourName = booking.Tour?.Name;
        }
        return booking;
    }

    internal async Task<Booking?> ExecuteUpdateStatus(int id, string status)
    {
        using var db = new VoyagoContext();
        var booking = await db.Bookings.Include(b => b.Tour).FirstOrDefaultAsync(b => b.Id == id);
        if (booking == null) return null;

        booking.Status = status;
        booking.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        booking.TourName = booking.Tour?.Name;
        return booking;
    }

    internal async Task<bool> ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();
        var booking = await db.Bookings.FirstOrDefaultAsync(b => b.Id == id);
        if (booking == null) return false;

        db.Bookings.Remove(booking);
        await db.SaveChangesAsync();
        return true;
    }
}