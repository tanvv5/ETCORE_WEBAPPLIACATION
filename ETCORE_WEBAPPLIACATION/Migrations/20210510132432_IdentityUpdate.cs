using Microsoft.EntityFrameworkCore.Migrations;

namespace ETCORE_WEBAPPLIACATION.Migrations
{
    public partial class IdentityUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Avartar",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Depathment",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Avartar",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Depathment",
                table: "AspNetUsers");
        }
    }
}
