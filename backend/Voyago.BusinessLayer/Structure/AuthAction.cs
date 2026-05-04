using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.BusinessLayer.Structure;

public class AuthAction : AuthActions, IAuthAction
{
    public AuthResponse? Login(UserLoginDto dto) => ExecuteLogin(dto);
    public AuthResponse? Register(UserRegisterDto dto) => ExecuteRegister(dto);
    public bool ChangePassword(Guid userId, ChangePasswordDto dto) => ExecuteChangePassword(userId, dto);
    public UserDto? GetMe(Guid userId) => ExecuteGetMe(userId);
}