using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Removed_Address_Entity_And_Modified_Order_And_Costumer_Entities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShippingAddress_Address1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Address2",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_City",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Country",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_FullName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_State",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Address1",
                table: "Costumers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Address2",
                table: "Costumers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_City",
                table: "Costumers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Country",
                table: "Costumers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_FullName",
                table: "Costumers");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_State",
                table: "Costumers");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Zip",
                table: "Orders",
                newName: "ShippingAddress");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Zip",
                table: "Costumers",
                newName: "ShippingAddress");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddress",
                table: "Orders",
                newName: "ShippingAddress_Zip");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress",
                table: "Costumers",
                newName: "ShippingAddress_Zip");

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Address1",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Address2",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_City",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Country",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_FullName",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_State",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Address1",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Address2",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_City",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_Country",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_FullName",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShippingAddress_State",
                table: "Costumers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
