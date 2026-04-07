using System.ComponentModel.DataAnnotations;
using Voyago.Domain.Enums;

namespace Voyago.Domain.Dtos;

public class TourDto
{
    [Required(ErrorMessage = "Locatia este obligatorie")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Locatia trebuie sa aiba intre 2 si 100 caractere")]
    public string Location { get; set; } = string.Empty;

    [Required(ErrorMessage = "Numele turului este obligatoriu")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele trebuie sa aiba intre 2 si 100 caractere")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Pretul este obligatoriu")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Pretul trebuie sa aiba intre 1 si 50 caractere")]
    public string Price { get; set; } = string.Empty;

    [Required(ErrorMessage = "Durata este obligatorie")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Durata trebuie sa aiba intre 1 si 50 caractere")]
    public string Days { get; set; } = string.Empty;

    [Required(ErrorMessage = "Descrierea este obligatorie")]
    [StringLength(1000, MinimumLength = 10, ErrorMessage = "Descrierea trebuie sa aiba intre 10 si 1000 caractere")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "URL-ul imaginii este obligatoriu")]
    [Url(ErrorMessage = "URL-ul imaginii nu este valid")]
    public string Image { get; set; } = string.Empty;

    [Required(ErrorMessage = "ID-ul destinatiei este obligatoriu")]
    [Range(1, int.MaxValue, ErrorMessage = "ID-ul destinatiei trebuie sa fie un numar pozitiv")]
    public int DestinationId { get; set; }

    [Required(ErrorMessage = "Statusul este obligatoriu")]
    public TourStatus Status { get; set; }
}