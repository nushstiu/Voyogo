using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Voyago.BusinessLayer;
using Voyago.Domain.Constants;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/analytics")]
[Authorize(Roles = Roles.Admin)]
public class AnalyticsController : ControllerBase
{
    private readonly BusinessLogic _bl;

    public AnalyticsController(BusinessLogic bl)
    {
        _bl = bl;
    }

    // GET /api/analytics/overview
    [HttpGet("overview")]
    public IActionResult GetOverview()
    {
        try
        {
            return Ok(_bl.AnalyticsAction().GetOverview());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea statisticilor: " + ex.Message);
        }
    }

    // GET /api/analytics/bookings/trends
    [HttpGet("bookings/trends")]
    public IActionResult GetBookingTrends()
    {
        try
        {
            return Ok(_bl.AnalyticsAction().GetBookingTrends());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea trendurilor: " + ex.Message);
        }
    }

    // GET /api/analytics/destinations/popular
    [HttpGet("destinations/popular")]
    public IActionResult GetPopularDestinations()
    {
        try
        {
            return Ok(_bl.AnalyticsAction().GetPopularDestinations());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea destinatiilor populare: " + ex.Message);
        }
    }

    // GET /api/analytics/revenue
    [HttpGet("revenue")]
    public IActionResult GetRevenueByDestination()
    {
        try
        {
            return Ok(_bl.AnalyticsAction().GetRevenueByDestination());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea veniturilor: " + ex.Message);
        }
    }

    // GET /api/analytics/bookings/status
    [HttpGet("bookings/status")]
    public IActionResult GetBookingStatusDistribution()
    {
        try
        {
            return Ok(_bl.AnalyticsAction().GetBookingStatusDistribution());
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Eroare la obtinerea distributiei statusurilor: " + ex.Message);
        }
    }
}