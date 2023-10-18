import StateRes from "./StateRes";

export default class CountryRes {
  countryId?: string;
  countryCode?: string;
  countryName?: string;
  states?: StateRes[];
}
