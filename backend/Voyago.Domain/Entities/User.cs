using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Entities;

public class User
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Username-ul este obligatoriu.")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Username-ul trebuie sa aiba intre 3 si 50 de caractere.")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "Emailul este obligatoriu.")]
    [StringLength(100, MinimumLength = 5, ErrorMessage = "Emailul trebuie sa aiba intre 5 si 100 de caractere.")]
    [EmailAddress(ErrorMessage = "Emailul nu este valid.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Parola este obligatorie.")]
    [MaxLength(64)]
    public string PasswordHash { get; set; } = string.Empty;

    [StringLength(20, MinimumLength = 7, ErrorMessage = "Numarul de telefon trebuie sa aiba intre 7 si 20 de caractere.")]
    public string? Phone { get; set; }

    [StringLength(60, MinimumLength = 2, ErrorMessage = "Tara trebuie sa aiba intre 2 si 60 de caractere.")]
    public string? Country { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [StringLength(200, MinimumLength = 5, ErrorMessage = "Adresa trebuie sa aiba intre 5 si 200 de caractere.")]
    public string? Address { get; set; }

    [StringLength(10, MinimumLength = 2, ErrorMessage = "Limba preferata trebuie sa aiba intre 2 si 10 de caractere.")]
    public string? PreferredLanguage { get; set; }

    [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele contactului de urgenta trebuie sa aiba intre 2 si 100 de caractere.")]
    public string? EmergencyContactName { get; set; }

    [StringLength(20, MinimumLength = 7, ErrorMessage = "Telefonul contactului de urgenta trebuie sa aiba intre 7 si 20 de caractere.")]
    public string? EmergencyContactPhone { get; set; }

    [StringLength(500, MinimumLength = 10, ErrorMessage = "URL-ul pozei de profil trebuie sa aiba intre 10 si 500 de caractere.")]
    public string? ProfilePic { get; set; }

    [Required]
    [StringLength(20)]
    public string Role { get; set; } = "User";

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}