import colors from "../res/colors";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import strings from "../res/strings";
import StoreKey from "./StoreKey";
import Cart from "../module/model/Cart";
import Product from "../module/model/Product";

class Session {
  bgColor = colors.colorMain;
  // cartNum = 0;
  cart: Cart = new Cart();

  constructor() {
    AsyncStorage.getItem(StoreKey.SAVE_CART)
      .then(res => {
        let data = JSON.parse(res);
        console.log("BACHK_data: ", data);

        if (data && data.carts) {
          this.cart.carts = data.carts;
          console.log("BACHK_cart: ", this.cart);
        }
      })
      .catch(err => {
        Alert.alert("", strings.http_error);
      });
  }

  updateBgColor = color => {};
}

var SessionStore: Session = SessionStore || new Session();
export default SessionStore;
