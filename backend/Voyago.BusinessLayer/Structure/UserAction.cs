using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.BusinessLayer.Structure;

public class UserAction : UserActions, IUserAction
{
    public List<UserDto> GetAll()               => ExecuteGetAll();
    public UserDto? GetById(int id)             => ExecuteGetById(id);
    public UserDto? Update(int id, UserDto dto) => ExecuteUpdate(id, dto);
    public bool Delete(int id)                  => ExecuteDelete(id);
}
