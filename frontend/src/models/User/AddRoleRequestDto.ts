export default class AddRoleRequestDto {
  userName?: string = "";
  roleName?: string = "";

  constructor(userName?: string, roleName?: string) {
    this.userName = userName;
    this.roleName = roleName;
  }
}
