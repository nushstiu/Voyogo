using System.ComponentModel.DataAnnotations;

namespace Voyago.BusinessLayer.Dtos;

public class BookingDto
{
    [Required(ErrorMessage = "ID-ul utilizatorului este obligatoriu")]
    [Range(1, int.MaxValue, ErrorMessage = "ID-ul utilizatorului trebuie sa fie un numar pozitiv")]
    public int UserId { get; set; }

    [Required(ErrorMessage = "Numele este obligatoriu")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Numele trebuie sa aiba intre 2 si 50 caractere")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Prenumele este obligatoriu")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Prenumele trebuie sa aiba intre 2 si 50 caractere")]
    public string Surname { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email-ul este obligatoriu")]
    [EmailAddress(ErrorMessage = "Email-ul nu este valid")]
    [StringLength(100, ErrorMessage = "Email-ul nu poate depasi 100 caractere")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Numarul de telefon este obligatoriu")]
    [Phone(ErrorMessage = "Numarul de telefon nu este valid")]
    [StringLength(20, MinimumLength = 10, ErrorMessage = "Numarul de telefon trebuie sa aiba intre 10 si 20 caractere")]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Destinatia este obligatorie")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Destinatia trebuie sa aiba intre 2 si 100 caractere")]
    public string Destination { get; set; } = string.Empty;

    public int? TourId { get; set; }

    [Required(ErrorMessage = "Data rezervarii este obligatorie")]
    public DateTime BookingDate { get; set; }

    [Required(ErrorMessage = "Durata este obligatorie")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Durata trebuie sa aiba intre 1 si 50 caractere")]
    public string Duration { get; set; } = string.Empty;

    [Required(ErrorMessage = "Statusul este obligatoriu")]
    [StringLength(50, ErrorMessage = "Statusul nu poate depasi 50 caractere")]
    public string Status { get; set; } = "pending";

    [StringLength(500, ErrorMessage = "Notitele nu pot depasi 500 caractere")]
    public string? Notes { get; set; }

    [StringLength(500, ErrorMessage = "Notitele admin nu pot depasi 500 caractere")]
    public string? AdminNotes { get; set; }
}
