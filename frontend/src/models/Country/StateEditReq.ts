export default class StateEditReq {
  stateCode?: string = "";
  stateName?: string = "";
  countryId?: string = "";

  constructor(countryId?: string) {
    this.countryId = countryId;
  }
}
