using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthAction _action;

    public AuthController(IAuthAction action)
    {
        _action = action;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto dto)
    {
        try
        {
            var response = _action.Login(dto);
            if (response == null) return Unauthorized("Email sau parola incorecte.");
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la autentificare: " + ex.Message);
        }
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegisterDto dto)
    {
        try
        {
            var response = _action.Register(dto);
            if (response == null) return BadRequest("Emailul este deja inregistrat.");
            return Created(string.Empty, response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la inregistrare: " + ex.Message);
        }
    }
}
