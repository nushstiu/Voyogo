using Voyago.BusinessLayer.Dtos;

namespace Voyago.BusinessLayer.Interfaces;

public interface IAuthAction
{
    AuthResponse? Login(UserLoginDto dto);
    AuthResponse? Register(UserRegisterDto dto);
    bool ChangePassword(Guid userId, ChangePasswordDto dto);
    UserDto? GetMe(Guid userId); 
}