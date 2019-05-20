import Product from "./Product";
import ProductDetail from "./ProductDetail";

class Cart {
  public carts: Array<{ product: ProductDetail; count: number }>;

  constructor() {
    this.carts = [];
  }

  public isExist = product => {
    let p = this.carts.find(i => {
      return i.product.name == product.name;
    });
    return p != null && p != undefined;
  };
}

export default Cart;
