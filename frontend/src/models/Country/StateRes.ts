import CountryRes from "./CountryRes";

export default class StateRes {
  stateId?: string;
  stateCode?: string;
  stateName?: string;

  countryId?: string;
  country?: CountryRes;
}
