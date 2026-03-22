using Voyago.BusinessLayer.Dtos;

namespace Voyago.BusinessLayer.Interfaces;

public interface IAuthAction
{
    AuthResponse? Login(UserLoginDto dto);
    AuthResponse? Register(UserRegisterDto dto);
}
