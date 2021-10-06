using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectBookShop.Migrations
{
    public partial class UpdateCart1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Cart",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Cart");
        }
    }
}
