using Microsoft.EntityFrameworkCore;
using Voyago.Domain.Enums;
using Voyago.Domain.Entities;

namespace Voyago.DataAccessLayer.Context;

public class VoyagoContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Destination> Destinations => Set<Destination>();
    public DbSet<Tour> Tours => Set<Tour>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

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

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.Tour)
            .WithMany()
            .HasForeignKey(b => b.TourId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany()
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        var seed = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<Destination>().HasData(
            new Destination { Id = 1, Name = "Paris", Packages = 8, PriceRange = "$1200 - $3500", Image = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", Description = "The city of light awaits with its iconic Eiffel Tower and world-class cuisine.", CreatedAt = seed },
            new Destination { Id = 2, Name = "Tokyo", Packages = 6, PriceRange = "$1500 - $4000", Image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", Description = "Experience the perfect blend of ancient tradition and cutting-edge technology.", CreatedAt = seed },
            new Destination { Id = 3, Name = "New York", Packages = 10, PriceRange = "$900 - $2800", Image = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", Description = "The Big Apple — a city that never sleeps with endless excitement and culture.", CreatedAt = seed }
        );

        modelBuilder.Entity<Tour>().HasData(
            new Tour { Id = 1, Location = "Paris, France", Name = "Paris Highlights Tour", Price = "$1299", Days = "7 days", Description = "Explore the best of Paris from the Eiffel Tower to Versailles.", Image = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", DestinationId = 1, Status = TourStatus.Active, CreatedAt = seed },
            new Tour { Id = 2, Location = "Paris, France", Name = "Paris Art & Culture", Price = "$1599", Days = "10 days", Description = "Discover the artistic heritage of Paris through its world-famous museums.", Image = "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800", DestinationId = 1, Status = TourStatus.Active, CreatedAt = seed },
            new Tour { Id = 3, Location = "Tokyo, Japan", Name = "Tokyo Explorer", Price = "$1899", Days = "8 days", Description = "From Shibuya to Akihabara, experience the full spectrum of Tokyo life.", Image = "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", DestinationId = 2, Status = TourStatus.Active, CreatedAt = seed },
            new Tour { Id = 4, Location = "Tokyo, Japan", Name = "Traditional Japan", Price = "$2199", Days = "12 days", Description = "Tea ceremonies, temples, and the timeless beauty of Japanese tradition.", Image = "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800", DestinationId = 2, Status = TourStatus.Inactive, CreatedAt = seed },
            new Tour { Id = 5, Location = "New York, USA", Name = "NYC Manhattan Rush", Price = "$999", Days = "5 days", Description = "Five days covering Times Square, Central Park, and the Brooklyn Bridge.", Image = "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", DestinationId = 3, Status = TourStatus.Active, CreatedAt = seed }
        );

        // Utilizatorii si rezervarile sunt seed-ate la startup prin Program.cs
        // (BCrypt este non-determinist, nu poate fi folosit in migrari EF Core)
    }
}
