using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class DestinationActions
{
    internal List<Destination> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return db.Destinations.ToList();
    }

    internal Destination? ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        return db.Destinations.FirstOrDefault(d => d.Id == id);
    }

    internal Destination ExecuteCreate(DestinationDto dto)
    {
        using var db = new VoyagoContext();
        var destination = new Destination
        {
            Name = dto.Name,
            Packages = dto.Packages,
            PriceRange = dto.PriceRange,
            Image = dto.Image,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow
        };
        db.Destinations.Add(destination);
        db.SaveChanges();
        return destination;
    }

    internal Destination? ExecuteUpdate(int id, DestinationDto dto)
    {
        using var db = new VoyagoContext();
        var destination = db.Destinations.FirstOrDefault(d => d.Id == id);
        if (destination == null) return null;

        destination.Name = dto.Name;
        destination.Packages = dto.Packages;
        destination.PriceRange = dto.PriceRange;
        destination.Image = dto.Image;
        destination.Description = dto.Description;

        db.SaveChanges();
        return destination;
    }

    internal bool ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();
        var destination = db.Destinations.FirstOrDefault(d => d.Id == id);
        if (destination == null) return false;

        db.Destinations.Remove(destination);
        db.SaveChanges();
        return true;
    }
}
