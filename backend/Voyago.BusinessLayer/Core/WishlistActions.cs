using Voyago.Domain.Dtos;
using Voyago.Domain.Entities;
using Voyago.DataAccessLayer.Context;

namespace Voyago.BusinessLayer.Core;

public abstract class WishlistActions
{
    internal List<Wishlist> ExecuteGetByUserId(int userId)
    {
        using var db = new VoyagoContext();
        return db.Wishlists
            .Where(w => w.UserId == userId)
            .ToList();
    }

    internal Wishlist? ExecuteGetById(int id)
    {
        using var db = new VoyagoContext();
        return db.Wishlists.FirstOrDefault(w => w.Id == id);
    }

    internal Wishlist ExecuteAdd(WishlistDto dto)
    {
        using var db = new VoyagoContext();

        var item = new Wishlist
        {
            UserId = dto.UserId,
            TourId = dto.TourId,
            CreatedAt = DateTime.UtcNow
        };

        db.Wishlists.Add(item);
        db.SaveChanges();

        return item;
    }

    internal bool ExecuteDelete(int id)
    {
        using var db = new VoyagoContext();

        var item = db.Wishlists.FirstOrDefault(w => w.Id == id);
        if (item == null) return false;

        db.Wishlists.Remove(item);
        db.SaveChanges();

        return true;
    }
}