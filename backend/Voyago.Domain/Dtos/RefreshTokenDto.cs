namespace Voyago.Domain.Dtos;

public class RefreshTokenDto
{
    public string Token { get; set; } = string.Empty;
    public int UserId { get; set; }
    public DateTime ExpiresAt { get; set; }
}
