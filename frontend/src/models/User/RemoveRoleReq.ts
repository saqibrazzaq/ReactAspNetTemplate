export default class RemoveRoleReq {
  userName?: string = "";
  roleName?: string = "";

  constructor(userName?: string, roleName?: string) {
    this.userName = userName;
    this.roleName = roleName;
  }
}
