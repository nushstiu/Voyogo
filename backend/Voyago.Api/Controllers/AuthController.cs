using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly BusinessLogic _bl;

    public AuthController(BusinessLogic bl)
    {
        _bl = bl;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto dto)
    {
        try
        {
            var response = _bl.AuthAction().Login(dto);
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
            var response = _bl.AuthAction().Register(dto);
            if (response == null) return BadRequest("Emailul este deja inregistrat.");
            return Created(string.Empty, response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la inregistrare: " + ex.Message);
        }
    }
}
