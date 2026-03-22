using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface ITourAction
{
    List<Tour> GetAll();
    Tour? GetById(Guid id);
    List<Tour> GetByDestinationId(int destinationId);
    Tour Create(TourDto dto);
    Tour? Update(Guid id, TourDto dto);
    bool Delete(Guid id);
}
