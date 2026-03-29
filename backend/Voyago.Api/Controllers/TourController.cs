using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Dtos;
using Voyago.BusinessLayer.Interfaces;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/tours")]
public class TourController : ControllerBase
{
    private readonly ITourAction _action;

    public TourController()
    {
        var bl = new BusinessLogic();
        _action = bl.TourAction();
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
            return StatusCode(500, "Eroare la obtinerea tururilor: " + ex.Message);
        }
    }

    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        try
        {
            var tour = _action.GetById(id);
            if (tour == null) return NotFound("Turul nu a fost gasit.");
            return Ok(tour);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea turului: " + ex.Message);
        }
    }

    [HttpGet("destination/{destinationId:int}")]
    public IActionResult GetByDestination(int destinationId)
    {
        try
        {
            return Ok(_action.GetByDestinationId(destinationId));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea tururilor dupa destinatie: " + ex.Message);
        }
    }

    [HttpPost]
    public IActionResult Create([FromBody] TourDto dto)
    {
        try
        {
            return Created(string.Empty, _action.Create(dto));
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la crearea turului: " + ex.Message);
        }
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] TourDto dto)
    {
        try
        {
            var updated = _action.Update(id, dto);
            if (updated == null) return NotFound("Turul nu a fost gasit.");
            return Ok(updated);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la actualizarea turului: " + ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        try
        {
            if (!_action.Delete(id)) return NotFound("Turul nu a fost gasit.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la stergerea turului: " + ex.Message);
        }
    }
}