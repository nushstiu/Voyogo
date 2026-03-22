using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class BookingAction : BookingActions, IBookingAction
{
    public List<Booking> GetAll() => ExecuteGetAll();
    public Booking? GetById(Guid id) => ExecuteGetById(id);
    public List<Booking> GetByUserId(Guid userId) => ExecuteGetByUserId(userId);
    public Booking Create(BookingDto dto) => ExecuteCreate(dto);
    public Booking? UpdateStatus(Guid id, string status) => ExecuteUpdateStatus(id, status);
    public bool Delete(Guid id) => ExecuteDelete(id);
}
