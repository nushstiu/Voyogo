using Voyago.Domain.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface ITourAction
{
    Task<List<Tour>> GetAll();
    Task<Tour?> GetById(int id);
    Task<List<Tour>> GetByDestinationId(int destinationId);
    Task<Tour> Create(TourDto dto);
    Task<Tour?> Update(int id, TourDto dto);
    Task<bool> Delete(int id);
}
