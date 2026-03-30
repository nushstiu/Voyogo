using Microsoft.EntityFrameworkCore;
using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class DestinationActions
{
    internal async Task<List<Destination>> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return await db.Destinations.ToListAsync();
    }

    internal async Task<Destination?> ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        return await db.Destinations.FirstOrDefaultAsync(d => d.Id == id);
    }

    internal async Task<Destination> ExecuteCreate(DestinationDto dto)
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
        await db.SaveChangesAsync();
        return destination;
    }

    internal async Task<Destination?> ExecuteUpdate(int id, DestinationDto dto)
    {
        using var db = new VoyagoContext();
        var destination = await db.Destinations.FirstOrDefaultAsync(d => d.Id == id);
        if (destination == null) return null;

        destination.Name = dto.Name;
        destination.Packages = dto.Packages;
        destination.PriceRange = dto.PriceRange;
        destination.Image = dto.Image;
        destination.Description = dto.Description;

        await db.SaveChangesAsync();
        return destination;
    }

    internal async Task<bool> ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();
        var destination = await db.Destinations.FirstOrDefaultAsync(d => d.Id == id);
        if (destination == null) return false;

        db.Destinations.Remove(destination);
        await db.SaveChangesAsync();
        return true;
    }
}
