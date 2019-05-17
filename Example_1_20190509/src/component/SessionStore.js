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

class Session {
  bgColor = colors.colorMain;
  cartNum = 0;

  constructor() {
    AsyncStorage.getItem(StoreKey.SAVE_CART)
      .then(res => {
        let data = JSON.parse(res);
        console.log("BACHK_data: ", data);

        if (data && data.cartNum) {
          this.cartNum = data.cartNum;
        }
      })
      .catch(err => {
        Alert.alert("", strings.http_error);
      });
  }

  updateBgColor = color => {};
}

var SessionStore = SessionStore || new Session();
export default SessionStore;
