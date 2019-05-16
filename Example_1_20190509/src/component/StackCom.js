import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ScreenName from "./ScreenName";
import Home from "./example1/shop/Home";
import CategoryScreen from "./example2/CategoryScreen";
import ProductScreen from "./example2/product/ProductScreen";
import ProductDetail from "./example2/product/ProductDetail";
import colors from "../res/colors";
import GeneralStatusBarColor from "../module/ui/GeneralStatusBarColorStyles";
import SessionStore from "./SessionStore";
import Utils from "../module/utils/Utils";

const StackApp = createStackNavigator(
  {
    [ScreenName.Example1]: {
      screen: Home
    },
    [ScreenName.Categories]: {
      screen: CategoryScreen
    },
    [ScreenName.Product]: {
      screen: ProductScreen
    },
    [ScreenName.Product_Detail]: {
      screen: ProductDetail
    }
  },
  (navigationOptions = {
    headerMode: "none",
    initialRouteName: ScreenName.Categories
  })
);

const StackContainer = createAppContainer(StackApp);

export default class StackCom extends Component {
  constructor(props) {
    super(props);
    SessionStore.updateBgColor = this.updateBgColor;
    SessionStore.bgColor = colors.colorMain;
    this.state = {
      bgColorApp: SessionStore.bgColor
    };

    console.log("BACHK_IS_PHONEX: ", Utils.isIphoneX());
  }

  updateBgColor = color => {
    SessionStore.bgColor = color;
    this.setState({ bgColorApp: color });
  };

  render() {
    return (
      <View
        style={{
          flex: 1
          //  backgroundColor: this.state.bgColorApp
        }}
      >
        <GeneralStatusBarColor
          backgroundColor={this.state.bgColorApp}
          barStyle="light-content"
        />
        <SafeAreaView style={{ flex: 1 }}>
          <StackContainer />
        </SafeAreaView>
      </View>
    );
  }
}
