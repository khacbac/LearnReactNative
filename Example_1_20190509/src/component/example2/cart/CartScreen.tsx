/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  AsyncStorage,
  Alert
} from "react-native";
import colors from "../../../res/colors";
import images from "../../../res/drawable/images";
import ProductDetail from "../../../module/model/ProductDetail";
import HeaderV2 from "../../../module/ui/HeaderV2";
import HeaderCart from "../../../module/ui/HeaderCart";
import SessionStore from "../../SessionStore";
import { BASE_URL } from "../../../module/http/HttpUtils";
import ReducerConstant from "../redux/reducers/ReducerContant";
import { setCart, updateCart } from "../redux/actions/CartAction";
import { connect } from "react-redux";
import Cart from "../../../module/model/Cart";
import StoreKey from "../../StoreKey";
import strings from "../../../res/strings";

enum CartAction {
  None = 0,
  Later = 1,
  PlaceOrder = 2
}

const { width, height } = Dimensions.get("window");

interface Props {
  navigation: any;
  carts: Array<Cart>;
  updateCart: (product: ProductDetail, count: number) => void;
}

interface State {
  actionAction: CartAction;
  // datas: Array<Cart>;
  cartNum: number;
}

class CartScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    let cartNum = 0;
    this.props.carts.forEach(i => {
      cartNum += i.count;
    });
    this.state = {
      actionAction: CartAction.PlaceOrder,
      // datas: this.props.carts,
      cartNum: cartNum
    };
  }

  _renderHeader = () => {
    let num = 0;
    this.props.carts.forEach(i => {
      num += i.count;
    });
    return (
      <HeaderCart
        leftIcon="chevron-left"
        onLeftIconPress={() => this.props.navigation.goBack()}
        rightIcon="shopping-basket"
        title={"Cart".toUpperCase()}
        txtColor={colors.colorWhite}
        rootStyle={{
          backgroundColor: SessionStore.bgColor
        }}
        cartNum={num}
      />
    );
  };

  _renderContentView = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.colorGrayMain
        }}
      >
        {this._renderNumberOfItem()}
        {/* render list data */}
        {this._renderListItem()}
        {/* render total price and quanlity */}
        {this._renderTotalView()}
      </View>
    );
  };

  _renderNumberOfItem = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 10
        }}
      >
        <Text style={{ color: "gray" }}>
          <Text style={{ color: "black" }}>{this.props.carts.length} </Text>
          items
        </Text>
      </View>
    );
  };

  _renderListItem = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.carts}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.product.name}
        />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    let pCart: Cart = item;
    return (
      <View
        style={{
          backgroundColor: "white",
          margin: 10,
          padding: 5,
          flexDirection: "row"
        }}
      >
        <Image
          source={{ uri: BASE_URL + pCart.product.photo_url }}
          style={{
            width: width / 3,
            height: width / 3
          }}
          resizeMode="contain"
        />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            padding: 10,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flex: 1
            }}
          >
            <View>
              <Text
                style={{
                  color: "black",
                  fontSize: 16
                }}
              >
                {pCart.product.name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: "gray",
                  fontSize: 12
                }}
              >
                {"This is descrption of " + pCart.product.name}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "red"
                }}
              >{`$${pCart.product.price}`}</Text>
            </View>
          </View>

          <View
            style={{
              // height: '100%',
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 10
            }}
          >
            {/* render plus action */}
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.onPlus(pCart.product)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "gray"
                }}
              >
                +
              </Text>
            </TouchableOpacity>
            {/* render count  */}
            <TouchableOpacity style={{ padding: 5 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "gray"
                }}
              >
                {pCart.count}
              </Text>
            </TouchableOpacity>
            {/* render Subtraction action */}
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.onSub(pCart.product)}
              disabled={pCart.count == 0}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "gray"
                }}
              >
                -
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  async onPlus(p: ProductDetail) {
    try {
      let cart: Cart = this.props.carts.find(item => {
        return item.product.name == p.name;
      });
      if (cart) {
        let carts = this.props.carts.map(item => {
          if (item.product.name == p.name) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        await AsyncStorage.setItem(StoreKey.SAVE_CART, JSON.stringify(carts));
        this.props.updateCart(cart.product, cart.count + 1);
      }
    } catch (error) {
      Alert.alert("", strings.http_error);
    }
  }

  async onSub(p: ProductDetail) {
    try {
      let cart: Cart = this.props.carts.find(item => {
        return item.product.name == p.name;
      });
      if (cart) {
        let carts = this.props.carts.map(item => {
          if (item.product.name == p.name) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        });
        await AsyncStorage.setItem(StoreKey.SAVE_CART, JSON.stringify(carts));
        this.props.updateCart(cart.product, cart.count - 1);
      }
    } catch (error) {
      Alert.alert("", strings.http_error);
    }
  }

  _renderTotalView = () => {
    let datas = this.props.carts;
    let total = 0;
    let quanlity = 0;
    datas.forEach(item => {
      total = total + item.count * item.product.price;
      quanlity = quanlity + item.count;
    });

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 10,
          flexDirection: "row"
        }}
      >
        <Text style={{ color: "gray" }}>
          {"Total: "}
          <Text style={{ color: "black" }}>{`$${total.toFixed(2)}`}</Text>
        </Text>
        <Text style={{ color: "gray", marginLeft: 50, marginRight: 10 }}>
          {"Quanlity: "}
          <Text style={{ color: "black" }}>{quanlity}</Text>
        </Text>
      </View>
    );
  };

  _renderBottomAction = () => {
    let isLaterActive = this.state.actionAction == CartAction.Later;
    let isPlaceOrderActive = this.state.actionAction == CartAction.PlaceOrder;
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: isLaterActive ? colors.colorGreen40 : "white"
          }}
          onPress={() => {
            this.setState({
              actionAction: CartAction.Later
            });
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: isLaterActive ? "white" : "black"
            }}
          >
            Later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: isPlaceOrderActive ? colors.colorGreen40 : "white"
          }}
          onPress={() => {
            this.setState({
              actionAction: CartAction.PlaceOrder
            });
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: isPlaceOrderActive ? "white" : "black"
            }}
          >
            Place order
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* header */}
        {this._renderHeader()}
        {/* main view */}
        {this._renderContentView()}
        {/* bottom actions */}
        {this._renderBottomAction()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCart: (carts: Array<Cart>) => dispatch(setCart(carts)),
    updateCart: (product: ProductDetail, count: number) =>
      dispatch(updateCart(product, count))
  };
};

const mapStateToProps = state => {
  return {
    carts: state[ReducerConstant.CartReducer].carts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
