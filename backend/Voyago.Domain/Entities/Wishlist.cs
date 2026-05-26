using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Entities;

public class Wishlist
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    public int TourId { get; set; }

    public DateTime CreatedAt { get; set; }
}