import { AddressRes } from "../Address";
import UserRes from "./UserRes";

export default class UserAddressRes {
  userAddressId?: string;
  addressId?: string;
  address?: AddressRes;
  username?: string;
  user?: UserRes;
}
