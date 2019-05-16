import { Dimensions, Platform } from "react-native";

class Utils {
  static isIphoneX() {
    const dim = Dimensions.get("window");

    return (
      // This has to be iOS
      Platform.OS === "ios" &&
      // Check either, iPhone X or XR
      (this.isIPhoneXSize(dim) || this.isIPhoneXrSize(dim))
    );
  }

  static isIPhoneXSize(dim) {
    return dim.height == 812 || dim.width == 812;
  }

  static isIPhoneXrSize(dim) {
    return dim.height == 896 || dim.width == 896;
  }
}

export default Utils;
