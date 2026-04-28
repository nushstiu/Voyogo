using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.Domain.Dtos;
using Voyago.Domain.Constants;

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
            if (!string.IsNullOrWhiteSpace(dto.Role) && dto.Role == Roles.Visitor)
                return BadRequest("Rolul 'Visitor' nu poate fi atribuit la inregistrare. Visitor = utilizator neautentificat.");

            if (!string.IsNullOrWhiteSpace(dto.Role) && dto.Role != Roles.User && dto.Role != Roles.Admin)
                return BadRequest($"Rol invalid. Roluri permise: {Roles.User}, {Roles.Admin}.");

            var response = _bl.AuthAction().Register(dto);
            if (response == null) return BadRequest("Emailul este deja inregistrat.");
            return Created(string.Empty, response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la inregistrare: " + ex.Message);
        }
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public IActionResult Refresh([FromBody] RefreshRequestDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto?.RefreshToken))
                return BadRequest("Token de reimprospatare lipsa.");

            var response = _bl.AuthAction().Refresh(dto.RefreshToken);
            if (response == null) return Unauthorized("Token invalid sau expirat.");
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la reimprospatarea tokenului: " + ex.Message);
        }
    }

    [HttpPost("revoke")]
    [Authorize]
    public IActionResult Revoke([FromBody] RefreshRequestDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto?.RefreshToken))
                return BadRequest("Token de reimprospatare lipsa.");

            _bl.AuthAction().Revoke(dto.RefreshToken);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la revocarea tokenului: " + ex.Message);
        }
    }
}