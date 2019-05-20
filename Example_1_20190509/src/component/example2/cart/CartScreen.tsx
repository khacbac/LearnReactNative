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
  SafeAreaView
} from "react-native";
import Header from "../../../module/ui/Header";
import colors from "../../../res/colors";
import images from "../../../res/drawable/images";
import ProductDetail from "../../../module/model/ProductDetail";
import HeaderV2 from "../../../module/ui/HeaderV2";
import HeaderCart from "../../../module/ui/HeaderCart";
import SessionStore from "../../SessionStore";
import { BASE_URL } from "../../../module/http/HttpUtils";

enum CartAction {
  None = 0,
  Later = 1,
  PlaceOrder = 2
}

const { width, height } = Dimensions.get("window");

interface Props {
  navigation: any;
}

interface State {
  actionAction: CartAction;
  datas: Array<{ product: ProductDetail; count: number }>;
  cartNum: number;
}

export default class CartScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    let cartNum = 0;
    SessionStore.cart.carts.forEach(i => {
      cartNum += i.count;
    });
    this.state = {
      actionAction: CartAction.PlaceOrder,
      datas: SessionStore.cart.carts,
      cartNum: cartNum
    };
  }

  _renderHeader = () => {
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
        cartNum={this.state.cartNum}
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
          <Text style={{ color: "black" }}>{this.state.datas.length} </Text>
          items
        </Text>
      </View>
    );
  };

  _renderListItem = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.datas}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.product.name}
        />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    console.log("BACHK__renderItem: ", item);
    let pCart: { product: ProductDetail; count: number } = item;
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

  onPlus(item) {
    this.setState({
      datas: this.state.datas.map(i => {
        if (item.name == i.product.name) {
          return { ...i, count: i.count + 1 };
        }
        return i;
      })
    });
  }

  onSub(item) {
    this.setState({
      datas: this.state.datas.map(i => {
        if (item.name == i.product.name) {
          return { ...i, count: i.count - 1 };
        }
        return i;
      })
    });
  }

  _renderTotalView = () => {
    let datas = this.state.datas;
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
          <Text style={{ color: "black" }}>{`$${total}`}</Text>
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
