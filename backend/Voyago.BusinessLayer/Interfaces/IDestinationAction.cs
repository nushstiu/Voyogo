using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface IDestinationAction
{
    Task<List<Destination>> GetAll();
    Task<Destination?> GetById(int id);
    Task<Destination> Create(DestinationDto dto);
    Task<Destination?> Update(int id, DestinationDto dto);
    Task<bool> Delete(int id);
}
