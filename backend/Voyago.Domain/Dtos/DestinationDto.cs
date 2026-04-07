using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Dtos;

public class DestinationDto
{
    [Required(ErrorMessage = "Numele destinatiei este obligatoriu")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele trebuie sa aiba intre 2 si 100 caractere")]
    public string Name { get; set; } = string.Empty;

    [Range(0, 1000, ErrorMessage = "Numarul de pachete trebuie sa fie intre 0 si 1000")]
    public int Packages { get; set; }

    [Required(ErrorMessage = "Gama de pret este obligatorie")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Gama de pret trebuie sa aiba intre 1 si 50 caractere")]
    public string PriceRange { get; set; } = string.Empty;

    [Required(ErrorMessage = "URL-ul imaginii este obligatoriu")]
    [Url(ErrorMessage = "URL-ul imaginii nu este valid")]
    public string Image { get; set; } = string.Empty;

    [Required(ErrorMessage = "Descrierea este obligatorie")]
    [StringLength(1000, MinimumLength = 10, ErrorMessage = "Descrierea trebuie sa aiba intre 10 si 1000 caractere")]
    public string Description { get; set; } = string.Empty;
}
