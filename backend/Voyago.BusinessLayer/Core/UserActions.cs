using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;

namespace Voyago.BusinessLayer.Core;

public abstract class UserActions
{
    internal List<UserDto> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return db.Users.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            Phone = u.Phone,
            Country = u.Country,
            DateOfBirth = u.DateOfBirth,
            Address = u.Address,
            PreferredLanguage = u.PreferredLanguage,
            EmergencyContactName = u.EmergencyContactName,
            EmergencyContactPhone = u.EmergencyContactPhone,
            ProfilePic = u.ProfilePic,
            Role = u.Role,
            CreatedAt = u.CreatedAt,
            UpdatedAt = u.UpdatedAt
        }).ToList();
    }

    internal UserDto? ExecuteGetById(Guid id)
    {
        using var db = new VoyagoContext();
        var u = db.Users.FirstOrDefault(u => u.Id == id);
        if (u == null) return null;

        return new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            Phone = u.Phone,
            Country = u.Country,
            DateOfBirth = u.DateOfBirth,
            Address = u.Address,
            PreferredLanguage = u.PreferredLanguage,
            EmergencyContactName = u.EmergencyContactName,
            EmergencyContactPhone = u.EmergencyContactPhone,
            ProfilePic = u.ProfilePic,
            Role = u.Role,
            CreatedAt = u.CreatedAt,
            UpdatedAt = u.UpdatedAt
        };
    }

    internal UserDto? ExecuteUpdate(Guid id, UserDto dto)
    {
        using var db = new VoyagoContext();
        var user = db.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return null;

        user.Username = dto.Username;
        user.Email = dto.Email;
        user.Phone = dto.Phone;
        user.Country = dto.Country;
        user.DateOfBirth = dto.DateOfBirth;
        user.Address = dto.Address;
        user.PreferredLanguage = dto.PreferredLanguage;
        user.EmergencyContactName = dto.EmergencyContactName;
        user.EmergencyContactPhone = dto.EmergencyContactPhone;
        user.UpdatedAt = DateTime.UtcNow;

        db.SaveChanges();

        dto.Id = user.Id;
        dto.Role = user.Role;
        dto.CreatedAt = user.CreatedAt;
        dto.UpdatedAt = user.UpdatedAt;

        return dto;
    }

    internal bool ExecuteDelete(Guid id)
    {
        using var db = new VoyagoContext();
        var user = db.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return false;

        db.Users.Remove(user);
        db.SaveChanges();
        return true;
    }

    internal UserDto? ExecuteUpdateAvatar(Guid id, string avatarUrl)
    {
        using var db = new VoyagoContext();
        var user = db.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return null;

        user.ProfilePic = avatarUrl;
        user.UpdatedAt = DateTime.UtcNow;
        db.SaveChanges();

        return new UserDto
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
}