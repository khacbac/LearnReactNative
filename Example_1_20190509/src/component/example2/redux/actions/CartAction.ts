import ProductDetail from "../../../../module/model/ProductDetail";
import Cart from "../../../../module/model/Cart";

enum CartType {
  ADD_CART = "ADD_CART",
  UPDATE_CART = "UPDATE_CART",
  PUSH_CART = "PUSH_CART",
}

const setCart = (carts: Array<Cart>) => ({
  type: CartType.ADD_CART,
  carts: carts
});

const updateCart = (product: ProductDetail, count: number) => ({
  type: CartType.UPDATE_CART,
  product: product,
  count: count
});

const pushProductToCart = (product: ProductDetail, count: number) => ({
  type: CartType.PUSH_CART,
  product: product,
  count: count
});

export { CartType, setCart, updateCart, pushProductToCart };
