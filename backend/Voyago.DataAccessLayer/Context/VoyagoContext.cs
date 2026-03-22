using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Voyago.Domain.Entities;
using Voyago.Domain.Enums;

namespace Voyago.DataAccessLayer.Context;

public class VoyagoContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Destination> Destinations => Set<Destination>();
    public DbSet<Tour> Tours => Set<Tour>();
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(DbSession.ConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tour>()
            .HasOne(t => t.Destination)
            .WithMany()
            .HasForeignKey(t => t.DestinationId)
            .OnDelete(DeleteBehavior.Cascade);

        var seed = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Destination>().HasData(
            new Destination { Id = 1, Name = "Paris", Packages = 8, PriceRange = "$1200 - $3500", Image = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", Description = "The city of light awaits with its iconic Eiffel Tower and world-class cuisine.", CreatedAt = seed },
            new Destination { Id = 2, Name = "Tokyo", Packages = 6, PriceRange = "$1500 - $4000", Image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", Description = "Experience the perfect blend of ancient tradition and cutting-edge technology.", CreatedAt = seed },
            new Destination { Id = 3, Name = "New York", Packages = 10, PriceRange = "$900 - $2800", Image = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", Description = "The Big Apple — a city that never sleeps with endless excitement and culture.", CreatedAt = seed }
        );

        var tour1 = new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
        var tour2 = new Guid("b2c3d4e5-f6a7-8901-bcde-f01234567891");
        var tour3 = new Guid("c3d4e5f6-a7b8-9012-cdef-012345678902");
        var tour4 = new Guid("d4e5f6a7-b8c9-0123-defa-123456789013");
        var tour5 = new Guid("e5f6a7b8-c9d0-1234-efab-234567890124");

        modelBuilder.Entity<Tour>().HasData(
            new Tour { Id = tour1, Location = "Paris, France", Name = "Paris Highlights Tour", Price = "$1299", Days = "7 days", Description = "Explore the best of Paris from the Eiffel Tower to Versailles.", Image = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", DestinationId = 1, Status = TourStatus.Active, CreatedAt = seed },
            new Tour { Id = tour2, Location = "Paris, France", Name = "Paris Art & Culture", Price = "$1599", Days = "10 days", Description = "Discover the artistic heritage of Paris through its world-famous museums.", Image = "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800", DestinationId = 1, Status = TourStatus.Active, CreatedAt = seed },
            new Tour { Id = tour3, Location = "Tokyo, Japan", Name = "Tokyo Explorer", Price = "$1899", Days = "8 days", Description = "From Shibuya to Akihabara, experience the full spectrum of Tokyo life.", Image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", DestinationId = 2, Status = TourStatus.Active, CreatedAt = seed },
            new Tour { Id = tour4, Location = "Tokyo, Japan", Name = "Traditional Japan", Price = "$2199", Days = "12 days", Description = "Tea ceremonies, temples, and the timeless beauty of Japanese tradition.", Image = "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800", DestinationId = 2, Status = TourStatus.Inactive, CreatedAt = seed },
            new Tour { Id = tour5, Location = "New York, USA", Name = "NYC Manhattan Rush", Price = "$999", Days = "5 days", Description = "Five days covering Times Square, Central Park, and the Brooklyn Bridge.", Image = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", DestinationId = 3, Status = TourStatus.Active, CreatedAt = seed }
        );

        var adminId = new Guid("f6a7b8c9-d0e1-2345-fabc-345678901235");
        var userId1 = new Guid("a7b8c9d0-e1f2-3456-abcd-456789012346");
        var adminHash = HashPassword("admin123");
        var userHash = HashPassword("user123");

        modelBuilder.Entity<User>().HasData(
            new User { Id = adminId, Username = "admin", Email = "admin@voyago.com", PasswordHash = adminHash, Phone = "+40712345678", Country = "Romania", Role = UserRole.Admin, CreatedAt = seed, UpdatedAt = seed },
            new User { Id = userId1, Username = "testuser", Email = "user@voyago.com", PasswordHash = userHash, Role = UserRole.User, CreatedAt = seed, UpdatedAt = seed }
        );

        var b1 = new Guid("b8c9d0e1-f2a3-4567-bcde-567890123457");
        var b2 = new Guid("c9d0e1f2-a3b4-5678-cdef-678901234568");
        var b3 = new Guid("d0e1f2a3-b4c5-6789-defa-789012345679");

        modelBuilder.Entity<Booking>().HasData(
            new Booking { Id = b1, UserId = userId1, Name = "Ion", Surname = "Popescu", Email = "user@voyago.com", Phone = "+40722000001", Destination = "Paris", TourId = tour1, TourName = "Paris Highlights Tour", BookingDate = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc), Duration = "7 days", Status = "confirmed", CreatedAt = seed },
            new Booking { Id = b2, UserId = userId1, Name = "Ion", Surname = "Popescu", Email = "user@voyago.com", Phone = "+40722000001", Destination = "Tokyo", TourId = tour3, TourName = "Tokyo Explorer", BookingDate = new DateTime(2024, 9, 15, 0, 0, 0, DateTimeKind.Utc), Duration = "8 days", Status = "pending", CreatedAt = seed },
            new Booking { Id = b3, UserId = adminId, Name = "Admin", Surname = "Voyago", Email = "admin@voyago.com", Phone = "+40712345678", Destination = "New York", TourId = tour5, TourName = "NYC Manhattan Rush", BookingDate = new DateTime(2024, 12, 20, 0, 0, 0, DateTimeKind.Utc), Duration = "5 days", Status = "confirmed", CreatedAt = seed }
        );
    }

    private static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(password);
        return Convert.ToHexString(sha.ComputeHash(bytes)).ToLower();
    }
}
