using System.ComponentModel.DataAnnotations;
using Voyago.Domain.Enums;

namespace Voyago.Domain.Entities;

public class Tour
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Location { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Price { get; set; } = string.Empty;

    [Required]
    public string Days { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;

    public int DestinationId { get; set; }
    public TourStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public Destination? Destination { get; set; }
}
