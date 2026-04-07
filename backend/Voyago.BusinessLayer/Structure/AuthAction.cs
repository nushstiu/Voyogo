using Microsoft.Extensions.Configuration;
using Voyago.BusinessLayer.Core;
using Voyago.Domain.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.BusinessLayer.Structure;

public class AuthAction : AuthActions, IAuthAction
{
    public AuthAction(IConfiguration configuration) : base(configuration) { }

    public AuthResponse? Login(UserLoginDto dto) => ExecuteLogin(dto);
    public AuthResponse? Register(UserRegisterDto dto) => ExecuteRegister(dto);
}
