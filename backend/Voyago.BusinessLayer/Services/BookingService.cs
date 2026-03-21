using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Services;

public class BookingService
{
    private static List<Booking> _items = new();

    public List<Booking> GetAll()
    {
        return _items;
    }

    public Booking? GetById(int id)
    {
        return _items.FirstOrDefault(x => x.Id == id);
    }

    public List<Booking> GetByUserName(string userName)
    {
        return _items.Where(x => x.UserName == userName).ToList();
    }

    public Booking Create(BookingDto dto)
    {
        var booking = new Booking
        {
            Id = _items.Count > 0 ? _items.Max(x => x.Id) + 1 : 1,
            TripId = dto.TripId,
            UserName = dto.UserName,
            BookingDate = dto.BookingDate,
            NumberOfPeople = dto.NumberOfPeople,
            TotalPrice = dto.TotalPrice,
            Status = dto.Status
        };

        _items.Add(booking);
        return booking;
    }

    public bool UpdateStatus(int id, string status)
    {
        var booking = _items.FirstOrDefault(x => x.Id == id);
        if (booking == null) return false;

        booking.Status = status;
        return true;
    }

    public bool Delete(int id)
    {
        var booking = _items.FirstOrDefault(x => x.Id == id);
        if (booking == null) return false;

        _items.Remove(booking);
        return true;
    }
}