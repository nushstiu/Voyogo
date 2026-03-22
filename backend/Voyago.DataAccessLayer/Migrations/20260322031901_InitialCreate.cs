using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Voyago.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bookings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TourId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TourName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BookingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdminNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Destinations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Packages = table.Column<int>(type: "int", nullable: false),
                    PriceRange = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Destinations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PreferredLanguage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmergencyContactName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmergencyContactPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProfilePic = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tours",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Days = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DestinationId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tours_Destinations_DestinationId",
                        column: x => x.DestinationId,
                        principalTable: "Destinations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Bookings",
                columns: new[] { "Id", "AdminNotes", "BookingDate", "CreatedAt", "Destination", "Duration", "Email", "Name", "Notes", "Phone", "Status", "Surname", "TourId", "TourName", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { new Guid("b8c9d0e1-f2a3-4567-bcde-567890123457"), null, new DateTime(2024, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Paris", "7 days", "user@voyago.com", "Ion", null, "+40722000001", "confirmed", "Popescu", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), "Paris Highlights Tour", null, new Guid("a7b8c9d0-e1f2-3456-abcd-456789012346") },
                    { new Guid("c9d0e1f2-a3b4-5678-cdef-678901234568"), null, new DateTime(2024, 9, 15, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Tokyo", "8 days", "user@voyago.com", "Ion", null, "+40722000001", "pending", "Popescu", new Guid("c3d4e5f6-a7b8-9012-cdef-012345678902"), "Tokyo Explorer", null, new Guid("a7b8c9d0-e1f2-3456-abcd-456789012346") },
                    { new Guid("d0e1f2a3-b4c5-6789-defa-789012345679"), null, new DateTime(2024, 12, 20, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "New York", "5 days", "admin@voyago.com", "Admin", null, "+40712345678", "confirmed", "Voyago", new Guid("e5f6a7b8-c9d0-1234-efab-234567890124"), "NYC Manhattan Rush", null, new Guid("f6a7b8c9-d0e1-2345-fabc-345678901235") }
                });

            migrationBuilder.InsertData(
                table: "Destinations",
                columns: new[] { "Id", "CreatedAt", "Description", "Image", "Name", "Packages", "PriceRange" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "The city of light awaits with its iconic Eiffel Tower and world-class cuisine.", "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", "Paris", 8, "$1200 - $3500" },
                    { 2, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Experience the perfect blend of ancient tradition and cutting-edge technology.", "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", "Tokyo", 6, "$1500 - $4000" },
                    { 3, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "The Big Apple — a city that never sleeps with endless excitement and culture.", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", "New York", 10, "$900 - $2800" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "Country", "CreatedAt", "DateOfBirth", "Email", "EmergencyContactName", "EmergencyContactPhone", "PasswordHash", "Phone", "PreferredLanguage", "ProfilePic", "Role", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { new Guid("a7b8c9d0-e1f2-3456-abcd-456789012346"), null, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "user@voyago.com", null, null, "e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446", null, null, null, 1, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "testuser" },
                    { new Guid("f6a7b8c9-d0e1-2345-fabc-345678901235"), null, "Romania", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "admin@voyago.com", null, null, "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", "+40712345678", null, null, 30, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin" }
                });

            migrationBuilder.InsertData(
                table: "Tours",
                columns: new[] { "Id", "CreatedAt", "Days", "Description", "DestinationId", "Image", "Location", "Name", "Price", "Status" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "7 days", "Explore the best of Paris from the Eiffel Tower to Versailles.", 1, "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", "Paris, France", "Paris Highlights Tour", "$1299", 0 },
                    { new Guid("b2c3d4e5-f6a7-8901-bcde-f01234567891"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "10 days", "Discover the artistic heritage of Paris through its world-famous museums.", 1, "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800", "Paris, France", "Paris Art & Culture", "$1599", 0 },
                    { new Guid("c3d4e5f6-a7b8-9012-cdef-012345678902"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "8 days", "From Shibuya to Akihabara, experience the full spectrum of Tokyo life.", 2, "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", "Tokyo, Japan", "Tokyo Explorer", "$1899", 0 },
                    { new Guid("d4e5f6a7-b8c9-0123-defa-123456789013"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "12 days", "Tea ceremonies, temples, and the timeless beauty of Japanese tradition.", 2, "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800", "Tokyo, Japan", "Traditional Japan", "$2199", 1 },
                    { new Guid("e5f6a7b8-c9d0-1234-efab-234567890124"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "5 days", "Five days covering Times Square, Central Park, and the Brooklyn Bridge.", 3, "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800", "New York, USA", "NYC Manhattan Rush", "$999", 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tours_DestinationId",
                table: "Tours",
                column: "DestinationId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Tours");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Destinations");
        }
    }
}
