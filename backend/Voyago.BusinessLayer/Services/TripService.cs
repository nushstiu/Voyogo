using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Services;

public class TripService
{
    private static List<Trip> _items = new();

    public List<Trip> GetAll()
    {
        return _items;
    }

    public Trip? GetById(int id)
    {
        return _items.FirstOrDefault(x => x.Id == id);
    }

    public List<Trip> GetByDestinationId(int destinationId)
    {
        return _items.Where(x => x.DestinationId == destinationId).ToList();
    }

    public Trip Create(TripDto dto)
    {
        var trip = new Trip
        {
            Id = _items.Count > 0 ? _items.Max(x => x.Id) + 1 : 1,
            Title = dto.Title,
            DestinationId = dto.DestinationId,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Price = dto.Price,
            AvailableSpots = dto.AvailableSpots,
            ImageUrl = dto.ImageUrl
        };

        _items.Add(trip);
        return trip;
    }

    public Trip? Update(int id, TripDto dto)
    {
        var trip = _items.FirstOrDefault(x => x.Id == id);
        if (trip == null) return null;

        trip.Title = dto.Title;
        trip.DestinationId = dto.DestinationId;
        trip.StartDate = dto.StartDate;
        trip.EndDate = dto.EndDate;
        trip.Price = dto.Price;
        trip.AvailableSpots = dto.AvailableSpots;
        trip.ImageUrl = dto.ImageUrl;

        return trip;
    }

    public bool Delete(int id)
    {
        var trip = _items.FirstOrDefault(x => x.Id == id);
        if (trip == null) return false;

        _items.Remove(trip);
        return true;
    }
}