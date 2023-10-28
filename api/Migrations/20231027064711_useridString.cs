using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class useridString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAddress_AspNetUsers_Username",
                table: "UserAddress");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "UserAddress",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserAddress_Username",
                table: "UserAddress",
                newName: "IX_UserAddress_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddress_AspNetUsers_UserId",
                table: "UserAddress",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAddress_AspNetUsers_UserId",
                table: "UserAddress");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserAddress",
                newName: "Username");

            migrationBuilder.RenameIndex(
                name: "IX_UserAddress_UserId",
                table: "UserAddress",
                newName: "IX_UserAddress_Username");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAddress_AspNetUsers_Username",
                table: "UserAddress",
                column: "Username",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
