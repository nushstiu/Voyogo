using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.Domain.Dtos;
using Voyago.Domain.Constants;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/wishlist")]
[Authorize(Roles = $"{Roles.User},{Roles.Admin}")]
public class WishlistController : ControllerBase
{
    private readonly BusinessLogic _bl;

    public WishlistController(BusinessLogic bl)
    {
        _bl = bl;
    }

    // GET /api/wishlist/user/{userId}
    // Returneaza toate toururile salvate de un user
    [HttpGet("user/{userId:int}")]
    public IActionResult GetByUser(int userId)
    {
        try
        {
            return Ok(_bl.WishlistAction().GetByUserId(userId));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea wishlist-ului: " + ex.Message);
        }
    }

    // GET /api/wishlist/{id}
    // Returneaza un singur item din wishlist dupa id
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        try
        {
            var item = _bl.WishlistAction().GetById(id);
            if (item == null) return NotFound("Itemul nu a fost gasit in wishlist.");
            return Ok(item);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea itemului: " + ex.Message);
        }
    }

    // POST /api/wishlist
    // Adauga un tour in wishlist
    // Body: { userId, tourId }
    [HttpPost]
    public IActionResult Add([FromBody] WishlistDto dto)
    {
        try
        {
            if (dto == null) return BadRequest("Corpul cererii nu poate fi null.");

            var created = _bl.WishlistAction().Add(dto);
            return Created(string.Empty, created);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la adaugarea in wishlist: " + ex.Message);
        }
    }

    // DELETE /api/wishlist/{id}
    // Sterge un item din wishlist dupa id
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        try
        {
            if (!_bl.WishlistAction().Delete(id))
                return NotFound("Itemul nu a fost gasit in wishlist.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea din wishlist: " + ex.Message);
        }
    }
}