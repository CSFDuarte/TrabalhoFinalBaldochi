export class Book {
    constructor(
      public ISBN: number,
      public title: string,
      public description: string,
      public price: number,
      public publisher: string,
      public pubdate: string,
      public edition: number,
      public pages: number,
      public categoryName: string,
      public authorFname: string,
      public authorLname: string
      ) 
    {}
  }
 