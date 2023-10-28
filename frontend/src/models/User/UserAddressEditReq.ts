import { AddressRes } from "../Address";

export default class UserAddressEditReq {
  addressId?: string = "";
  address?: AddressRes;
  username?: string = "";
}
