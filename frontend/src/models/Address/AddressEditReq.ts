export default class AddressEditReq {
  isPrimary?: boolean;
  fullName?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  stateId?: string;

  constructor(stateId?: string) {
    this.stateId = stateId;
  }
}
