using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Voyago.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangeRoleToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // First, convert existing int values to their string equivalents
            // SQL Server will auto-cast int to nvarchar, resulting in "1", "30", etc.
            // After AlterColumn, we update those numeric strings to proper role names.
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Users",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            // Convert old numeric values to role names for any dynamically created users
            migrationBuilder.Sql("UPDATE Users SET Role = 'User' WHERE Role = '1'");
            migrationBuilder.Sql("UPDATE Users SET Role = 'Admin' WHERE Role = '30'");

            // Update seed data
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Role",
                value: "Admin");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Role",
                value: "User");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Convert string role names back to int before changing column type
            migrationBuilder.Sql("UPDATE Users SET Role = '1' WHERE Role = 'User'");
            migrationBuilder.Sql("UPDATE Users SET Role = '30' WHERE Role = 'Admin'");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Role",
                value: 30);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Role",
                value: 1);
        }
    }
}