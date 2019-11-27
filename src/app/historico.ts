export class Historico {
    constructor(
      public orderID: number,
      public ISBN: string,
      public quantidade: number,
      public price: number,
      public subtotal: number,
      public date: string
      ) 
    {}
  }