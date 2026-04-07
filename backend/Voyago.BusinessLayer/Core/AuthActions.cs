using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Constants;
using Voyago.Domain.Entities;

namespace Voyago.BusinessLayer.Core;

public abstract class AuthActions
{
    protected readonly IConfiguration _configuration;

    protected AuthActions(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    internal AuthResponse? ExecuteLogin(UserLoginDto dto)
    {
        using var db = new VoyagoContext();
        var hash = HashPassword(dto.Password);
        var user = db.Users.FirstOrDefault(u => u.Email == dto.Email && u.PasswordHash == hash);
        if (user == null) return null;

        return new AuthResponse { User = MapToDto(user), Token = GenerateJwtToken(user) };
    }

    internal AuthResponse? ExecuteRegister(UserRegisterDto dto)
    {
        using var db = new VoyagoContext();
        if (db.Users.Any(u => u.Email == dto.Email)) return null;

        var role = string.IsNullOrWhiteSpace(dto.Role) ? Roles.User : dto.Role;

        if (role == Roles.Visitor)
            return null;

        if (role != Roles.User && role != Roles.Admin)
            return null;

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = HashPassword(dto.Password),
            Role = role,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.Users.Add(user);
        db.SaveChanges();

        return new AuthResponse { User = MapToDto(user), Token = GenerateJwtToken(user) };
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expireMinutes = int.Parse(_configuration["Jwt:ExpireMinutes"] ?? "1440");

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    internal static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        return Convert.ToHexString(sha.ComputeHash(bytes)).ToLower();
    }

    internal static UserDto MapToDto(User user) => new()
    {
        Id = user.Id,
        Username = user.Username,
        Email = user.Email,
        Phone = user.Phone,
        Country = user.Country,
        DateOfBirth = user.DateOfBirth,
        Address = user.Address,
        PreferredLanguage = user.PreferredLanguage,
        EmergencyContactName = user.EmergencyContactName,
        EmergencyContactPhone = user.EmergencyContactPhone,
        ProfilePic = user.ProfilePic,
        Role = user.Role,
        CreatedAt = user.CreatedAt,
        UpdatedAt = user.UpdatedAt
    };
}
