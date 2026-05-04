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

    // PUT /api/auth/change-password
    // Header: X-User-Id: <guid>
    [HttpPut("change-password")]
    public IActionResult ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userIdHeader = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userIdHeader) || !Guid.TryParse(userIdHeader, out var userId))
            return Unauthorized(new { message = "Missing or invalid X-User-Id header." });

        if (string.IsNullOrWhiteSpace(dto.CurrentPassword) || string.IsNullOrWhiteSpace(dto.NewPassword))
            return BadRequest(new { message = "CurrentPassword and NewPassword are required." });

        var success = _action.ChangePassword(userId, dto);
        if (!success)
            return BadRequest(new { message = "Current password is incorrect or user not found." });

        return Ok(new { message = "Password changed successfully." });
    }

    // GET /api/auth/me
    // Header: X-User-Id: <guid>
    [HttpGet("me")]
    public IActionResult GetMe()
    {
        var userIdHeader = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userIdHeader) || !Guid.TryParse(userIdHeader, out var userId))
            return Unauthorized(new { message = "Missing or invalid X-User-Id header." });

        var user = _action.GetMe(userId);
        if (user == null) return NotFound(new { message = "User not found." });

        return Ok(user);
    }
}