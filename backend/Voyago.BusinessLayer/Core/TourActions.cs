using Microsoft.EntityFrameworkCore;
using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class TourActions
{
    internal async Task<List<Tour>> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return await db.Tours.ToListAsync();
    }

    internal async Task<Tour?> ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        return await db.Tours.FirstOrDefaultAsync(t => t.Id == id);
    }

    internal async Task<List<Tour>> ExecuteGetByDestinationId(int destinationId)
    {
        using var db = new VoyagoContext();
        return await db.Tours.Where(t => t.DestinationId == destinationId).ToListAsync();
    }

    internal async Task<Tour> ExecuteCreate(TourDto dto)
    {
        using var db = new VoyagoContext();

        // Validate foreign key: DestinationId must exist
        var destinationExists = await db.Destinations.AnyAsync(d => d.Id == dto.DestinationId);
        if (!destinationExists)
        {
            throw new InvalidOperationException($"Destinatia cu ID-ul {dto.DestinationId} nu exista.");
        }

        var tour = new Tour
        {
            Location = dto.Location,
            Name = dto.Name,
            Price = dto.Price,
            Days = dto.Days,
            Description = dto.Description,
            Image = dto.Image,
            DestinationId = dto.DestinationId,
            Status = dto.Status,
            CreatedAt = DateTime.UtcNow
        };
        db.Tours.Add(tour);
        await db.SaveChangesAsync();
        return tour;
    }

    internal async Task<Tour?> ExecuteUpdate(int id, TourDto dto)
    {
        using var db = new VoyagoContext();
        var tour = await db.Tours.FirstOrDefaultAsync(t => t.Id == id);
        if (tour == null) return null;

        // Validate foreign key: DestinationId must exist
        var destinationExists = await db.Destinations.AnyAsync(d => d.Id == dto.DestinationId);
        if (!destinationExists)
        {
            throw new InvalidOperationException($"Destinatia cu ID-ul {dto.DestinationId} nu exista.");
        }

        tour.Location = dto.Location;
        tour.Name = dto.Name;
        tour.Price = dto.Price;
        tour.Days = dto.Days;
        tour.Description = dto.Description;
        tour.Image = dto.Image;
        tour.DestinationId = dto.DestinationId;
        tour.Status = dto.Status;

        await db.SaveChangesAsync();
        return tour;
    }

    internal async Task<bool> ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();
        var tour = await db.Tours.FirstOrDefaultAsync(t => t.Id == id);
        if (tour == null) return false;

        db.Tours.Remove(tour);
        await db.SaveChangesAsync();
        return true;
    }
}
