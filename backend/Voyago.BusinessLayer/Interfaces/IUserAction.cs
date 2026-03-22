using Voyago.BusinessLayer.Dtos;

namespace Voyago.BusinessLayer.Interfaces;

public interface IUserAction
{
    List<UserDto> GetAll();
    UserDto? GetById(Guid id);
    UserDto? Update(Guid id, UserDto dto);
    bool Delete(Guid id);
}
