using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class TourAction : TourActions, ITourAction
{
    public async Task<List<Tour>> GetAll()                                => await ExecuteGetAll();
    public async Task<Tour?> GetById(int id)                              => await ExecuteGetById(id);
    public async Task<List<Tour>> GetByDestinationId(int destinationId)   => await ExecuteGetByDestinationId(destinationId);
    public async Task<Tour> Create(TourDto dto)                           => await ExecuteCreate(dto);
    public async Task<Tour?> Update(int id, TourDto dto)                  => await ExecuteUpdate(id, dto);
    public async Task<bool> Delete(int id)                                => await ExecuteDelete(id);
}
