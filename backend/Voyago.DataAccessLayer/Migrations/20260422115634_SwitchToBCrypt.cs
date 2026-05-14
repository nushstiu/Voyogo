using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Voyago.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SwitchToBCrypt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Bookings",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Bookings",
                columns: new[] { "Id", "AdminNotes", "BookingDate", "CreatedAt", "Destination", "Duration", "Email", "Name", "Notes", "Phone", "Status", "Surname", "TourId", "UpdatedAt", "UserId" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2024, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Paris", "7 days", "user@voyago.com", "Ion", null, "+40722000001", "confirmed", "Popescu", 1, null, 2 },
                    { 2, null, new DateTime(2024, 9, 15, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Tokyo", "8 days", "user@voyago.com", "Ion", null, "+40722000001", "pending", "Popescu", 3, null, 2 },
                    { 3, null, new DateTime(2024, 12, 20, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "New York", "5 days", "admin@voyago.com", "Admin", null, "+40712345678", "confirmed", "Voyago", 5, null, 1 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "Country", "CreatedAt", "DateOfBirth", "Email", "EmergencyContactName", "EmergencyContactPhone", "PasswordHash", "Phone", "PreferredLanguage", "ProfilePic", "Role", "UpdatedAt", "Username" },
                values: new object[,]
                {
                    { 1, null, "Romania", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "admin@voyago.com", null, null, "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", "+40712345678", null, null, "Admin", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin" },
                    { 2, null, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, "user@voyago.com", null, null, "e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446", null, null, null, "User", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "testuser" }
                });
        }
    }
}
