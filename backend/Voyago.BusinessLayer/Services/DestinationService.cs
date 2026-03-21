using Voyago.BusinessLayer.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Services;

public class DestinationService
{
    private static List<Destination> _items = new();

    public List<Destination> GetAll()
    {
        return _items;
    }

    public Destination? GetById(int id)
    {
        return _items.FirstOrDefault(x => x.Id == id);
    }

    public Destination Create(DestinationDto dto)
    {
        var destination = new Destination
        {
            Id = _items.Count > 0 ? _items.Max(x => x.Id) + 1 : 1,
            Name = dto.Name,
            Country = dto.Country,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            Rating = dto.Rating
        };

        _items.Add(destination);
        return destination;
    }

    public Destination? Update(int id, DestinationDto dto)
    {
        var destination = _items.FirstOrDefault(x => x.Id == id);
        if (destination == null) return null;

        destination.Name = dto.Name;
        destination.Country = dto.Country;
        destination.Description = dto.Description;
        destination.ImageUrl = dto.ImageUrl;
        destination.Rating = dto.Rating;

        return destination;
    }

    public bool Delete(int id)
    {
        var destination = _items.FirstOrDefault(x => x.Id == id);
        if (destination == null) return false;

        _items.Remove(destination);
        return true;
    }
}