using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserAction _action;

    public UserController()
    {
        var bl = new BusinessLogic();
        _action = bl.UserAction();
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        try
        {
            return Ok(_action.GetAll());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea utilizatorilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        try
        {
            var user = _action.GetById(id);
            if (user == null) return NotFound("Utilizatorul nu a fost gasit.");
            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea utilizatorului: " + ex.Message);
        }
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UserDto dto)
    {
        try
        {
            var updated = _action.Update(id, dto);
            if (updated == null) return NotFound("Utilizatorul nu a fost gasit.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea utilizatorului: " + ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        try
        {
            if (!_action.Delete(id)) return NotFound("Utilizatorul nu a fost gasit.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea utilizatorului: " + ex.Message);
        }
    }
}