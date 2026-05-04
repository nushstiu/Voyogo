using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.BusinessLayer.Structure;

public class UserAction : UserActions, IUserAction
{
    public List<UserDto> GetAll() => ExecuteGetAll();
    public UserDto? GetById(Guid id) => ExecuteGetById(id);
    public UserDto? Update(Guid id, UserDto dto) => ExecuteUpdate(id, dto);
    public bool Delete(Guid id) => ExecuteDelete(id);
    public UserDto? UpdateAvatar(Guid id, string avatarUrl) => ExecuteUpdateAvatar(id, avatarUrl);
}