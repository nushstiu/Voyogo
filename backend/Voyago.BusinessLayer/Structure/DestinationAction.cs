using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class DestinationAction : DestinationActions, IDestinationAction
{
    public List<Destination> GetAll() => ExecuteGetAll();
    public Destination? GetById(int id) => ExecuteGetById(id);
    public Destination Create(DestinationDto dto) => ExecuteCreate(dto);
    public Destination? Update(int id, DestinationDto dto) => ExecuteUpdate(id, dto);
    public bool Delete(int id) => ExecuteDelete(id);
}
