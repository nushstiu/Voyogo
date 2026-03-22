using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthAction _action;

    public AuthController()
    {
        var bl = new BusinessLogic();
        _action = bl.AuthAction();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto dto)
    {
        var response = _action.Login(dto);
        if (response == null) return Unauthorized();
        return Ok(response);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegisterDto dto)
    {
        var response = _action.Register(dto);
        if (response == null) return BadRequest("Email already registered.");
        return Created(string.Empty, response);
    }
}
