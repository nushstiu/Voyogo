using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Entities;

public class Booking
{
    [Key]
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Surname { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string Destination { get; set; } = string.Empty;

    public Guid? TourId { get; set; }
    public string? TourName { get; set; }

    public DateTime BookingDate { get; set; }

    [Required]
    public string Duration { get; set; } = string.Empty;

    [Required]
    public string Status { get; set; } = string.Empty;

    public string? Notes { get; set; }
    public string? AdminNotes { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
