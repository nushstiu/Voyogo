using Voyago.Domain.Dtos;

namespace Voyago.BusinessLayer.Interfaces;

public interface IUserAction
{
    List<UserDto> GetAll();
    UserDto? GetById(int id);
    UserDto? Update(int id, UserDto dto);
    bool Delete(int id);
}