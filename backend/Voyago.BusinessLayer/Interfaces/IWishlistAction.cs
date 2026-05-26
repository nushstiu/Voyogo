using Voyago.Domain.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Interfaces;

public interface IWishlistAction
{
    List<Wishlist> GetByUserId(int userId);
    Wishlist? GetById(int id);
    Wishlist Add(WishlistDto dto);
    bool Delete(int id);
}