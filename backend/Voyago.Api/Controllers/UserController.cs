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

    // POST /api/users/{id}/avatar
    // multipart/form-data, field: "avatar"
    // Header: X-User-Id pentru verificare identitate (optional, Lab 5)
    [HttpPost("{id:guid}/avatar")]
    public async Task<IActionResult> UploadAvatar(Guid id, IFormFile avatar)
    {
        var userIdHeader = Request.Headers["X-User-Id"].FirstOrDefault();
        var roleHeader = Request.Headers["X-User-Role"].FirstOrDefault();

        // 401 daca lipseste headerul de autentificare
        if (string.IsNullOrWhiteSpace(userIdHeader) || !Guid.TryParse(userIdHeader, out var requesterId))
            return Unauthorized(new { message = "Missing or invalid X-User-Id header." });

        // 403 daca userul incearca sa modifice alt user si nu e admin
        var isAdmin = string.Equals(roleHeader, "Admin", StringComparison.OrdinalIgnoreCase) ||
                      string.Equals(roleHeader, "30", StringComparison.OrdinalIgnoreCase);

        if (requesterId != id && !isAdmin)
            return StatusCode(403, new { message = "You are not allowed to update another user's avatar." });

        if (avatar == null || avatar.Length == 0)
            return BadRequest(new { message = "No file provided." });

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var ext = Path.GetExtension(avatar.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(ext))
            return BadRequest(new { message = "Invalid file type. Allowed: jpg, jpeg, png, webp." });

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars");
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{id}{ext}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await avatar.CopyToAsync(stream);
        }

        var avatarUrl = $"/avatars/{fileName}";
        var updated = _action.UpdateAvatar(id, avatarUrl);
        if (updated == null) return NotFound(new { message = "User not found." });

        return Ok(new { avatarUrl, user = updated });
    }
}