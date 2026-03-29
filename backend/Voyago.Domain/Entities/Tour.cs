using System.ComponentModel.DataAnnotations;
using Voyago.Domain.Enums;

namespace Voyago.Domain.Entities;

public class Tour
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Locatia turului este obligatorie.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Locatia trebuie sa aiba intre 2 si 100 de caractere.")]
    public string Location { get; set; } = string.Empty;

    [Required(ErrorMessage = "Numele turului este obligatoriu.")]
    [StringLength(150, MinimumLength = 3, ErrorMessage = "Numele turului trebuie sa aiba intre 3 si 150 de caractere.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Pretul turului este obligatoriu.")]
    [StringLength(20, MinimumLength = 1, ErrorMessage = "Pretul trebuie sa aiba intre 1 si 20 de caractere.")]
    public string Price { get; set; } = string.Empty;

    [Required(ErrorMessage = "Durata turului este obligatorie.")]
    [StringLength(20, MinimumLength = 1, ErrorMessage = "Durata trebuie sa aiba intre 1 si 20 de caractere.")]
    public string Days { get; set; } = string.Empty;

    [Required(ErrorMessage = "Descrierea turului este obligatorie.")]
    [StringLength(1000, MinimumLength = 10, ErrorMessage = "Descrierea trebuie sa aiba intre 10 si 1000 de caractere.")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Imaginea turului este obligatorie.")]
    [StringLength(500, MinimumLength = 10, ErrorMessage = "URL-ul imaginii trebuie sa aiba intre 10 si 500 de caractere.")]
    public string Image { get; set; } = string.Empty;

    public int DestinationId { get; set; }
    public TourStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }

    public Destination? Destination { get; set; }
}