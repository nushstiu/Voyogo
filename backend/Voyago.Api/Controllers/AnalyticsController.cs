using Microsoft.AspNetCore.Mvc;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Enums;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    // Verifica daca requestul vine de la un admin (prin header X-User-Role)
    private bool IsAdmin()
    {
        var role = Request.Headers["X-User-Role"].FirstOrDefault();
        return string.Equals(role, "Admin", StringComparison.OrdinalIgnoreCase) ||
               string.Equals(role, "30", StringComparison.OrdinalIgnoreCase);
    }

    [HttpGet("overview")]
    public IActionResult GetOverview()
    {
        var userId = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userId)) return Unauthorized(new { message = "Missing X-User-Id header." });
        if (!IsAdmin()) return StatusCode(403, new { message = "Admin access required." });

        using var db = new VoyagoContext();

        var totalUsers = db.Users.Count();
        var totalBookings = db.Bookings.Count();
        var activeTours = db.Tours.Count(t => t.Status == TourStatus.Active);

        var totalRevenue = db.Bookings
            .Join(
                db.Tours,
                booking => booking.TourId,
                tour => tour.Id,
                (booking, tour) => ParsePrice(tour.Price)
            )
            .Sum();

        return Ok(new
        {
            totalUsers,
            totalBookings,
            totalRevenue,
            activeTours
        });
    }

    [HttpGet("bookings/trends")]
    public IActionResult GetBookingTrends()
    {
        var userId = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userId)) return Unauthorized(new { message = "Missing X-User-Id header." });
        if (!IsAdmin()) return StatusCode(403, new { message = "Admin access required." });

        using var db = new VoyagoContext();

        var result = db.Bookings
            .AsEnumerable()
            .GroupBy(b => new { b.BookingDate.Year, b.BookingDate.Month })
            .OrderBy(g => g.Key.Year)
            .ThenBy(g => g.Key.Month)
            .Select(g => new
            {
                month = $"{g.Key.Year}-{g.Key.Month:D2}",
                count = g.Count()
            })
            .ToList();

        return Ok(result);
    }

    [HttpGet("destinations/popular")]
    public IActionResult GetPopularDestinations()
    {
        var userId = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userId)) return Unauthorized(new { message = "Missing X-User-Id header." });
        if (!IsAdmin()) return StatusCode(403, new { message = "Admin access required." });

        using var db = new VoyagoContext();

        var result = db.Bookings
            .AsEnumerable()
            .GroupBy(b => b.Destination)
            .Select(g => new
            {
                name = g.Key,
                bookings = g.Count()
            })
            .OrderByDescending(x => x.bookings)
            .ToList();

        return Ok(result);
    }

    [HttpGet("revenue")]
    public IActionResult GetRevenueByDestination()
    {
        var userId = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userId)) return Unauthorized(new { message = "Missing X-User-Id header." });
        if (!IsAdmin()) return StatusCode(403, new { message = "Admin access required." });

        using var db = new VoyagoContext();

        var result = db.Bookings
            .Join(
                db.Tours,
                booking => booking.TourId,
                tour => tour.Id,
                (booking, tour) => new
                {
                    destination = booking.Destination,
                    revenue = ParsePrice(tour.Price)
                }
            )
            .AsEnumerable()
            .GroupBy(x => x.destination)
            .Select(g => new
            {
                destination = g.Key,
                revenue = g.Sum(x => x.revenue)
            })
            .OrderByDescending(x => x.revenue)
            .ToList();

        return Ok(result);
    }

    [HttpGet("bookings/status")]
    public IActionResult GetBookingStatusDistribution()
    {
        var userId = Request.Headers["X-User-Id"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(userId)) return Unauthorized(new { message = "Missing X-User-Id header." });
        if (!IsAdmin()) return StatusCode(403, new { message = "Admin access required." });

        using var db = new VoyagoContext();

        var total = db.Bookings.Count();
        if (total == 0) return Ok(new List<object>());

        var result = db.Bookings
            .AsEnumerable()
            .GroupBy(b => b.Status)
            .Select(g => new
            {
                status = g.Key,
                count = g.Count(),
                percentage = Math.Round((double)g.Count() * 100 / total, 2)
            })
            .OrderByDescending(x => x.count)
            .ToList();

        return Ok(result);
    }

    private static decimal ParsePrice(string price)
    {
        if (string.IsNullOrWhiteSpace(price)) return 0;
        var cleaned = price.Replace("$", "").Replace(",", "").Trim();
        return decimal.TryParse(cleaned, out var value) ? value : 0;
    }
}