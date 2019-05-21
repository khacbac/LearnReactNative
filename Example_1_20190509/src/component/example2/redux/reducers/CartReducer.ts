import { CartType } from "../actions/CartAction";
import ProductDetail from "../../../../module/model/ProductDetail";
import Cart from "../../../../module/model/Cart";

let defaultState = {
  carts: new Array<Cart>(),
  testNum: 0
};

const CartReducer = (
  state = defaultState,
  action: {
    type: string;
    carts?: Array<Cart>;
    product?: ProductDetail;
    count?: number;
  }
) => {
  switch (action.type) {
    case CartType.ADD_CART:
      return {
        ...state,
        // cart: { ...action.cart, carts: [...action.cart.carts] }
        carts: [...action.carts]
      };
    case CartType.UPDATE_CART:
      return {
        ...state,
        carts: state.carts.map(item => {
          if (item.product.name == action.product.name) {
            return { ...item, count: action.count };
          }
          return item;
        }),
        testNum: state.testNum + 1
      };
    case CartType.PUSH_CART:
      return {
        ...state,
        carts: [
          ...state.carts,
          { product: action.product, count: action.count }
        ]
      };
    default:
      return state;
  }
};

export default CartReducer;
