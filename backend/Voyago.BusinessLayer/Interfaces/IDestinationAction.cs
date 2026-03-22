using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface IDestinationAction
{
    List<Destination> GetAll();
    Destination? GetById(int id);
    Destination Create(DestinationDto dto);
    Destination? Update(int id, DestinationDto dto);
    bool Delete(int id);
}
