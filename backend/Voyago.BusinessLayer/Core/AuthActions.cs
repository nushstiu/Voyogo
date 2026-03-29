using System.Security.Cryptography;
using System.Text;
using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Entities;
using Voyago.Domain.Enums;

namespace Voyago.BusinessLayer.Core;

public abstract class AuthActions
{
    internal AuthResponse? ExecuteLogin(UserLoginDto dto)
    {
        using var db = new VoyagoContext();
        var hash = HashPassword(dto.Password);
        var user = db.Users.FirstOrDefault(u => u.Email == dto.Email && u.PasswordHash == hash);
        if (user == null) return null;

        return new AuthResponse { User = MapToDto(user), Token = Guid.NewGuid().ToString() };
    }

    internal AuthResponse? ExecuteRegister(UserRegisterDto dto)
    {
        using var db = new VoyagoContext();
        if (db.Users.Any(u => u.Email == dto.Email)) return null;

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = HashPassword(dto.Password),
            Role = UserRole.User,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        db.Users.Add(user);
        db.SaveChanges();

        return new AuthResponse { User = MapToDto(user), Token = Guid.NewGuid().ToString() };
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
