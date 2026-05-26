using Voyago.BusinessLayer.Core;
using Voyago.BusinessLayer.Interfaces;
using Voyago.Domain.Dtos;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Structure;

public class WishlistAction : WishlistActions, IWishlistAction
{
    public List<Wishlist> GetByUserId(int userId) => ExecuteGetByUserId(userId);
    public Wishlist? GetById(int id)              => ExecuteGetById(id);
    public Wishlist Add(WishlistDto dto)           => ExecuteAdd(dto);
    public bool Delete(int id)                    => ExecuteDelete(id);
}