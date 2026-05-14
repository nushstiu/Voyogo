using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Voyago.Domain.Entities;

public class Booking
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    [Required(ErrorMessage = "Prenumele este obligatoriu.")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Prenumele trebuie sa aiba intre 2 si 50 de caractere.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Numele de familie este obligatoriu.")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Numele de familie trebuie sa aiba intre 2 si 50 de caractere.")]
    public string Surname { get; set; } = string.Empty;

    [Required(ErrorMessage = "Emailul este obligatoriu.")]
    [StringLength(100, MinimumLength = 5, ErrorMessage = "Emailul trebuie sa aiba intre 5 si 100 de caractere.")]
    [EmailAddress(ErrorMessage = "Emailul nu este valid.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Numarul de telefon este obligatoriu.")]
    [StringLength(20, MinimumLength = 7, ErrorMessage = "Numarul de telefon trebuie sa aiba intre 7 si 20 de caractere.")]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Destinatia este obligatorie.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Destinatia trebuie sa aiba intre 2 si 100 de caractere.")]
    public string Destination { get; set; } = string.Empty;

    public int? TourId { get; set; }

    [NotMapped]
    public string? TourName { get; set; }

    public DateTime BookingDate { get; set; }

    [Required(ErrorMessage = "Durata rezervarii este obligatorie.")]
    [StringLength(20, MinimumLength = 1, ErrorMessage = "Durata trebuie sa aiba intre 1 si 20 de caractere.")]
    public string Duration { get; set; } = string.Empty;

    [Required(ErrorMessage = "Statusul rezervarii este obligatoriu.")]
    [StringLength(20, MinimumLength = 2, ErrorMessage = "Statusul trebuie sa aiba intre 2 si 20 de caractere.")]
    public string Status { get; set; } = string.Empty;

    [StringLength(500, MinimumLength = 2, ErrorMessage = "Notele trebuie sa aiba intre 2 si 500 de caractere.")]
    public string? Notes { get; set; }

    [StringLength(500, MinimumLength = 2, ErrorMessage = "Notele adminului trebuie sa aiba intre 2 si 500 de caractere.")]
    public string? AdminNotes { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public Tour? Tour { get; set; }
}
