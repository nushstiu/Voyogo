using Voyago.Domain.Dtos;

namespace Voyago.BusinessLayer.Interfaces;

public interface IAuthAction
{
    AuthResponse? Login(UserLoginDto dto);
    AuthResponse? Register(UserRegisterDto dto);
    AuthResponse? Refresh(string refreshToken);
    void Revoke(string refreshToken);
}
