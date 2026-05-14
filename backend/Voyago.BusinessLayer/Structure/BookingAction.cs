using Voyago.BusinessLayer.Core;
using Voyago.Domain.Dtos;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class BookingAction : BookingActions, IBookingAction
{
    public async Task<List<Booking>> GetAll()                       => await ExecuteGetAll();
    public async Task<Booking?> GetById(int id)                     => await ExecuteGetById(id);
    public async Task<List<Booking>> GetByUserId(int userId)        => await ExecuteGetByUserId(userId);
    public async Task<Booking> Create(BookingDto dto)               => await ExecuteCreate(dto);
    public async Task<Booking?> Update(int id, BookingDto dto)      => await ExecuteUpdate(id, dto);
    public async Task<Booking?> UpdateStatus(int id, string status) => await ExecuteUpdateStatus(id, status);
    public async Task<bool> Delete(int id)                          => await ExecuteDelete(id);
}
