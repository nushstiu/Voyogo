using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Enums;

namespace Voyago.Api.Controllers;

[ApiController]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    [HttpGet("overview")]
    public IActionResult GetOverview()
    {
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
        using var db = new VoyagoContext();

        var total = db.Bookings.Count();

        if (total == 0)
        {
            return Ok(new List<object>());
        }

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
        if (string.IsNullOrWhiteSpace(price))
            return 0;

        var cleaned = price.Replace("$", "").Replace(",", "").Trim();

        return decimal.TryParse(cleaned, out var value) ? value : 0;
    }
}