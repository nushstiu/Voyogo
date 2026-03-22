using Voyago.BusinessLayer.Dtos;
using Voyago.DataAccessLayer.Context;

namespace Voyago.BusinessLayer.Core;

public abstract class UserActions
{
    internal List<UserDto> ExecuteGetAll()
    {
        using var db = new VoyagoContext();
        return db.Users.Select(u => AuthActions.MapToDto(u)).ToList();
    }

    internal UserDto? ExecuteGetById(Guid id)
    {
        using var db = new VoyagoContext();
        var user = db.Users.FirstOrDefault(u => u.Id == id);
        return user == null ? null : AuthActions.MapToDto(user);
    }

    internal UserDto? ExecuteUpdate(Guid id, UserDto dto)
    {
        using var db = new VoyagoContext();
        var user = db.Users.FirstOrDefault(u => u.Id == id);
        if (user == null) return null;

        user.Username = dto.Username;
        user.Phone = dto.Phone;
        user.Country = dto.Country;
        user.DateOfBirth = dto.DateOfBirth;
        user.Address = dto.Address;
        user.PreferredLanguage = dto.PreferredLanguage;
        user.EmergencyContactName = dto.EmergencyContactName;
        user.EmergencyContactPhone = dto.EmergencyContactPhone;
        user.ProfilePic = dto.ProfilePic;
        user.UpdatedAt = DateTime.UtcNow;

        db.SaveChanges();
        return AuthActions.MapToDto(user);
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
}
