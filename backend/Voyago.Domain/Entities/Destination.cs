using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Entities;

public class Destination
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public int Packages { get; set; }

    [StringLength(50)]
    public string PriceRange { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
