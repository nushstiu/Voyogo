using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Entities;

public class Destination
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Numele destinatiei este obligatoriu.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele destinatiei trebuie sa aiba intre 2 si 100 de caractere.")]
    public string Name { get; set; } = string.Empty;

    [Range(0, 1000, ErrorMessage = "Numarul de pachete trebuie sa fie intre 0 si 1000.")]
    public int Packages { get; set; }

    [Required(ErrorMessage = "Intervalul de pret este obligatoriu.")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Intervalul de pret trebuie sa aiba intre 1 si 50 de caractere.")]
    public string PriceRange { get; set; } = string.Empty;

    [Required(ErrorMessage = "Imaginea destinatiei este obligatorie.")]
    [StringLength(500, MinimumLength = 10, ErrorMessage = "URL-ul imaginii trebuie sa aiba intre 10 si 500 de caractere.")]
    public string Image { get; set; } = string.Empty;

    [Required(ErrorMessage = "Descrierea destinatiei este obligatorie.")]
    [StringLength(1000, MinimumLength = 10, ErrorMessage = "Descrierea trebuie sa aiba intre 10 si 1000 de caractere.")]
    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}