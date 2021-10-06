using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectBookShop.Migrations
{
    public partial class UpdateCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Customer",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "CouponCode",
                table: "CouponDiscount",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Cart",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameReceiveProduct",
                table: "Cart",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SDT",
                table: "Cart",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Customer_Email",
                table: "Customer",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CouponDiscount_CouponCode",
                table: "CouponDiscount",
                column: "CouponCode",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Customer_Email",
                table: "Customer");

            migrationBuilder.DropIndex(
                name: "IX_CouponDiscount_CouponCode",
                table: "CouponDiscount");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "NameReceiveProduct",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "SDT",
                table: "Cart");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Customer",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "CouponCode",
                table: "CouponDiscount",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
