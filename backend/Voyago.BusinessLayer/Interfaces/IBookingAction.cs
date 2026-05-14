using Voyago.Domain.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface IBookingAction
{
    Task<List<Booking>> GetAll();
    Task<Booking?> GetById(int id);
    Task<List<Booking>> GetByUserId(int userId);
    Task<Booking> Create(BookingDto dto);
    Task<Booking?> Update(int id, BookingDto dto);
    Task<Booking?> UpdateStatus(int id, string status);
    Task<bool> Delete(int id);
}
