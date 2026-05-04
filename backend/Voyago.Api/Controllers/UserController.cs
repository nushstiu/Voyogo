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
    public IActionResult GetAll() => Ok(_action.GetAll());

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var user = _action.GetById(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, [FromBody] UserDto dto)
    {
        var updated = _action.Update(id, dto);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        if (!_action.Delete(id)) return NotFound();
        return NoContent();
    }
    [HttpPost("{id}/avatar")]
    public IActionResult UpdateAvatar(Guid id, [FromBody] string avatarUrl)
    {
        var result = _action.UpdateAvatar(id, avatarUrl);
        if (result == null) return NotFound();
        return Ok(result);
    }
}
