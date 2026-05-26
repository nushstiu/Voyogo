using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Enums;

namespace Voyago.BusinessLayer.Core;

public abstract class AnalyticsActions
{
    internal object ExecuteGetOverview()
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

        return new
        {
            totalUsers,
            totalBookings,
            totalRevenue,
            activeTours
        };
    }

    internal List<object> ExecuteGetBookingTrends()
    {
        using var db = new VoyagoContext();

        return db.Bookings
            .AsEnumerable()
            .GroupBy(b => new { b.BookingDate.Year, b.BookingDate.Month })
            .OrderBy(g => g.Key.Year)
            .ThenBy(g => g.Key.Month)
            .Select(g => (object)new
            {
                month = $"{g.Key.Year}-{g.Key.Month:D2}",
                count = g.Count()
            })
            .ToList();
    }

    internal List<object> ExecuteGetPopularDestinations()
    {
        using var db = new VoyagoContext();

        return db.Bookings
            .AsEnumerable()
            .GroupBy(b => b.Destination)
            .Select(g => (object)new
            {
                name = g.Key,
                bookings = g.Count()
            })
            .OrderByDescending(x => ((dynamic)x).bookings)
            .ToList();
    }

    internal List<object> ExecuteGetRevenueByDestination()
    {
        using var db = new VoyagoContext();

        return db.Bookings
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
            .Select(g => (object)new
            {
                destination = g.Key,
                revenue = g.Sum(x => x.revenue)
            })
            .OrderByDescending(x => ((dynamic)x).revenue)
            .ToList();
    }

    internal List<object> ExecuteGetBookingStatusDistribution()
    {
        using var db = new VoyagoContext();

        var total = db.Bookings.Count();
        if (total == 0) return new List<object>();

        return db.Bookings
            .AsEnumerable()
            .GroupBy(b => b.Status)
            .Select(g => (object)new
            {
                status = g.Key,
                count = g.Count(),
                percentage = Math.Round((double)g.Count() * 100 / total, 2)
            })
            .OrderByDescending(x => ((dynamic)x).count)
            .ToList();
    }

    private static decimal ParsePrice(string price)
    {
        if (string.IsNullOrWhiteSpace(price)) return 0;
        var cleaned = price.Replace("$", "").Replace(",", "").Trim();
        return decimal.TryParse(cleaned, out var value) ? value : 0;
    }
}