using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Voyago.BusinessLayer;
using Voyago.BusinessLayer.Core;
using Voyago.DataAccessLayer;
using Voyago.DataAccessLayer.Context;
using Voyago.Domain.Constants;
using Voyago.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

DbSession.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Dependency Injection
builder.Services.AddSingleton<BusinessLogic>();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"]!;
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});


builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Introdu tokenul JWT"
    });
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Seed utilizatori si rezervari la startup (BCrypt - nu poate fi in migrari EF)
SeedDatabase();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

void SeedDatabase()
{
    using var db = new VoyagoContext();
    db.Database.Migrate();

    var seedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    if (!db.Users.Any(u => u.Email == "admin@voyago.com"))
    {
        db.Users.Add(new User
        {
            Username = "admin",
            Email = "admin@voyago.com",
            PasswordHash = AuthActions.HashPassword("admin123"),
            Phone = "+40712345678",
            Country = "Romania",
            Role = Roles.Admin,
            CreatedAt = seedDate,
            UpdatedAt = seedDate
        });
        db.SaveChanges();
    }

    if (!db.Users.Any(u => u.Email == "user@voyago.com"))
    {
        db.Users.Add(new User
        {
            Username = "testuser",
            Email = "user@voyago.com",
            PasswordHash = AuthActions.HashPassword("user123"),
            Role = Roles.User,
            CreatedAt = seedDate,
            UpdatedAt = seedDate
        });
        db.SaveChanges();
    }

    if (!db.Bookings.Any())
    {
        var adminUser = db.Users.First(u => u.Email == "admin@voyago.com");
        var testUser = db.Users.First(u => u.Email == "user@voyago.com");

        // Folosim tour ID-urile care exista efectiv in DB
        var tourIds = db.Tours.OrderBy(t => t.Id).Select(t => (int?)t.Id).ToList();
        int? tId0 = tourIds.Count > 0 ? tourIds[0] : null;
        int? tId2 = tourIds.Count > 2 ? tourIds[2] : null;
        int? tId4 = tourIds.Count > 4 ? tourIds[4] : null;

        db.Bookings.AddRange(
            new Booking
            {
                UserId = testUser.Id,
                Name = "Ion", Surname = "Popescu",
                Email = "user@voyago.com", Phone = "+40722000001",
                Destination = "Paris", TourId = tId0,
                BookingDate = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc),
                Duration = "7 days", Status = "confirmed",
                CreatedAt = seedDate
            },
            new Booking
            {
                UserId = testUser.Id,
                Name = "Ion", Surname = "Popescu",
                Email = "user@voyago.com", Phone = "+40722000001",
                Destination = "Tokyo", TourId = tId2,
                BookingDate = new DateTime(2024, 9, 15, 0, 0, 0, DateTimeKind.Utc),
                Duration = "8 days", Status = "pending",
                CreatedAt = seedDate
            },
            new Booking
            {
                UserId = adminUser.Id,
                Name = "Admin", Surname = "Voyago",
                Email = "admin@voyago.com", Phone = "+40712345678",
                Destination = "New York", TourId = tId4,
                BookingDate = new DateTime(2024, 12, 20, 0, 0, 0, DateTimeKind.Utc),
                Duration = "5 days", Status = "confirmed",
                CreatedAt = seedDate
            }
        );
        db.SaveChanges();
    }
}
