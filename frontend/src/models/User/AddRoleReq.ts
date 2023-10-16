export default class AddRoleReq {
  userName?: string = "";
  roleName?: string = "";

  constructor(userName?: string, roleName?: string) {
    this.userName = userName;
    this.roleName = roleName;
  }
}
