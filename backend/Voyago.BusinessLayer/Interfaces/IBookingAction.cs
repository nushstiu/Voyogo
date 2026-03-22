using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface IBookingAction
{
    List<Booking> GetAll();
    Booking? GetById(Guid id);
    List<Booking> GetByUserId(Guid userId);
    Booking Create(BookingDto dto);
    Booking? UpdateStatus(Guid id, string status);
    bool Delete(Guid id);
}
