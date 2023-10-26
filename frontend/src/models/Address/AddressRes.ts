import { StateRes } from "../Country";

export default class AddressRes {
  addressId?: string;
  isPrimary?: boolean;
  fullName?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  stateId?: string;
  state?: StateRes;
}
