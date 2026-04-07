using System.ComponentModel.DataAnnotations;

namespace Voyago.Domain.Dtos;

public class UpdateStatusDto
{
    [Required(ErrorMessage = "Statusul este obligatoriu")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Statusul trebuie sa aiba intre 1 si 50 caractere")]
    public string Status { get; set; } = string.Empty;
}