import React from "react";
import { View, StatusBar, StyleSheet, Platform } from "react-native";
import Utils from "../utils/Utils";
const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default GeneralStatusBarColor;

const STATUSBAR_HEIGHT =
  Platform.OS === "ios"
    ? Utils.isIphoneX()
      ? 44
      : 20
    : StatusBar.currentHeight;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});
