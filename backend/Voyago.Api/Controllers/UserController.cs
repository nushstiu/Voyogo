using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.Domain.Dtos;
using Voyago.Domain.Constants;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/users")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly BusinessLogic _bl;

    public UserController(BusinessLogic bl)
    {
        _bl = bl;
    }

    [HttpGet("me")]
    [Authorize(Roles = $"{Roles.User},{Roles.Admin}")]
    public IActionResult GetMe()
    {
        try
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userIdStr == null || !int.TryParse(userIdStr, out int userId))
                return Unauthorized("Token invalid.");

            var user = _bl.UserAction().GetById(userId);
            if (user == null) return NotFound("Utilizatorul nu a fost gasit.");
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea utilizatorului curent: " + ex.Message);
        }
    }

    [HttpGet]
    [Authorize(Roles = Roles.Admin)]
    public IActionResult GetAll()
    {
        try
        {
            return Ok(_bl.UserAction().GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea utilizatorilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    [Authorize(Roles = $"{Roles.User},{Roles.Admin}")]
    public IActionResult GetById(int id)
    {
        try
        {
            var user = _bl.UserAction().GetById(id);
            if (user == null) return NotFound("Utilizatorul nu a fost gasit.");
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea utilizatorului: " + ex.Message);
        }
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = $"{Roles.User},{Roles.Admin}")]
    public IActionResult Update(int id, [FromBody] UserDto dto)
    {
        try
        {
            var updated = _bl.UserAction().Update(id, dto);
            if (updated == null) return NotFound("Utilizatorul nu a fost gasit.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea utilizatorului: " + ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = Roles.Admin)]
    public IActionResult Delete(int id)
    {
        try
        {
            if (!_bl.UserAction().Delete(id)) return NotFound("Utilizatorul nu a fost gasit.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea utilizatorului: " + ex.Message);
        }
    }
}