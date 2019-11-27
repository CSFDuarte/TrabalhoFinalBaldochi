export class Carrinho {
    constructor(
      public ISBN: number,
      public title: string,
      public price: number,
      public quantidade: number,
      public subtotal: number
      ) 
    {}
  }