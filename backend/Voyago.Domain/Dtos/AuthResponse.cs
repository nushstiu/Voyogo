namespace Voyago.Domain.Dtos;

public class AuthResponse
{
    public UserDto User { get; set; } = new();
    public string Token { get; set; } = string.Empty;
}
