
export default class PagedRequestParameters  {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;

  constructor(
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ) {

    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}
