import PagedRequestParameters from "../Request/RequestParameters";

export default class SearchUsersReq extends PagedRequestParameters {
  searchTerm?: string;

  constructor(
    searchTerm?: string,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ) {
    super(pageNumber, pageSize, orderBy);

    this.searchTerm = searchTerm;
  }
}
