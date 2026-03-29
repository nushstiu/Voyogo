using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface ITourAction
{
    List<Tour> GetAll();
    Tour? GetById(int id);
    List<Tour> GetByDestinationId(int destinationId);
    Tour Create(TourDto dto);
    Tour? Update(int id, TourDto dto);
    bool Delete(int id);
}
