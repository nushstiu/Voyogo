using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class DestinationAction : DestinationActions, IDestinationAction
{
    public async Task<List<Destination>> GetAll() => await ExecuteGetAll();
    public async Task<Destination?> GetById(int id) => await ExecuteGetById(id);
    public async Task<Destination> Create(DestinationDto dto) => await ExecuteCreate(dto);
    public async Task<Destination?> Update(int id, DestinationDto dto) => await ExecuteUpdate(id, dto);
    public async Task<bool> Delete(int id) => await ExecuteDelete(id);
}
