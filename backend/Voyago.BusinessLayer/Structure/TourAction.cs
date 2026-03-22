using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class TourAction : TourActions, ITourAction
{
    public List<Tour> GetAll() => ExecuteGetAll();
    public Tour? GetById(Guid id) => ExecuteGetById(id);
    public List<Tour> GetByDestinationId(int destinationId) => ExecuteGetByDestinationId(destinationId);
    public Tour Create(TourDto dto) => ExecuteCreate(dto);
    public Tour? Update(Guid id, TourDto dto) => ExecuteUpdate(id, dto);
    public bool Delete(Guid id) => ExecuteDelete(id);
}
