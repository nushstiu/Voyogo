using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class TourActions
{
    internal List<Tour> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return db.Tours.ToList();
    }

    internal Tour? ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        return db.Tours.FirstOrDefault(t => t.Id == id);
    }

    internal List<Tour> ExecuteGetByDestinationId(int destinationId)
    {
        using var db = new VoyagoContext();
        return db.Tours.Where(t => t.DestinationId == destinationId).ToList();
    }

    internal Tour ExecuteCreate(TourDto dto)
    {
        using var db = new VoyagoContext();
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
        db.SaveChanges();
        return tour;
    }

    internal Tour? ExecuteUpdate(int id, TourDto dto)
    {
        using var db = new VoyagoContext();
        var tour = db.Tours.FirstOrDefault(t => t.Id == id);
        if (tour == null) return null;

        tour.Location = dto.Location;
        tour.Name = dto.Name;
        tour.Price = dto.Price;
        tour.Days = dto.Days;
        tour.Description = dto.Description;
        tour.Image = dto.Image;
        tour.DestinationId = dto.DestinationId;
        tour.Status = dto.Status;

        db.SaveChanges();
        return tour;
    }

    internal bool ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();
        var tour = db.Tours.FirstOrDefault(t => t.Id == id);
        if (tour == null) return false;

        db.Tours.Remove(tour);
        db.SaveChanges();
        return true;
    }
}
