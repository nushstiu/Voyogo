using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface IBookingAction
{
    List<Booking> GetAll();
    Booking? GetById(int id);
    List<Booking> GetByUserId(int userId);
    Booking Create(BookingDto dto);
    Booking? UpdateStatus(int id, string status);
    bool Delete(int id);
}
