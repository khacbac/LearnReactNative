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
// import Cart from "../module/model/Cart";
import Product from "../module/model/Product";

class Session {
  bgColor = colors.colorMain;

  updateBgColor = color => {};
}

var SessionStore: Session = SessionStore || new Session();
export default SessionStore;
