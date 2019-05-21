import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  AsyncStorage,
  Alert
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ScreenName from "./ScreenName";
import Home from "./example1/shop/Home";
import CategoryScreen from "./example2/CategoryScreen";
import ProductScreen from "./example2/product/ProductScreen";
import ProductDetailScreen from "./example2/product/ProductDetail";
import colors from "../res/colors";
import GeneralStatusBarColor from "../module/ui/GeneralStatusBarColorStyles";
import SessionStore from "./SessionStore";
import Utils from "../module/utils/Utils";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import CartScreen from "./example2/cart/CartScreen";
import CartReducer from "./example2/redux/reducers/CartReducer";
import ReducerConstant from "./example2/redux/reducers/ReducerContant";
import StoreKey from "./StoreKey";

import strings from "../res/strings";
import ProductDetail from "../module/model/ProductDetail";
import { setCart } from "./example2/redux/actions/CartAction";

const reducers = combineReducers({
  [ReducerConstant.CartReducer]: CartReducer,
});

const store = createStore(reducers);

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
      screen: ProductDetailScreen
    },
    [ScreenName.Cart_Screen]: {
      screen: CartScreen
    }
  },
  {
    headerMode: "none",
    initialRouteName: ScreenName.Categories
  }
);

const StackContainer = createAppContainer(StackApp);

interface Props {
  
}

interface State {
  bgColorApp: string;
}

export default class StackCom extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    SessionStore.updateBgColor = this.updateBgColor;
    SessionStore.bgColor = colors.colorMain;
    this.state = {
      bgColorApp: SessionStore.bgColor
    };

  }

  updateBgColor = color => {
    SessionStore.bgColor = color;
    this.setState({ bgColorApp: color });
  };

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}
