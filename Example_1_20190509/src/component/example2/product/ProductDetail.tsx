import React, { Component } from "react";
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
import HeaderV2 from "../../../module/ui/HeaderV2";
import colors from "../../../res/colors";
import HttpUtils, { Status, BASE_URL } from "../../../module/http/HttpUtils";
import strings from "../../../res/strings";
import dimens from "../../../res/dimens";
// import SessionStore from "../../SessionStore";
import HeaderCart from "../../../module/ui/HeaderCart";
import StoreKey from "../../StoreKey";
import Product from "../../../module/model/Product";
import ProductDetail from "../../../module/model/ProductDetail";
import ScreenName from "../../ScreenName";
import ReducerConstant from "../redux/reducers/ReducerContant";
import { connect } from "react-redux";
import {
  setCart,
  updateCart,
  pushProductToCart
} from "../redux/actions/CartAction";
import SessionStore from "../../SessionStore";
import Cart from "../../../module/model/Cart";

interface Props {
  navigation: any;
  // cart: Cart;
  setCart: (carts: Array<Cart>) => void;
  carts: Array<Cart>;
  updateCart: (product: ProductDetail, count: number) => void;
  pushProductToCart: (product: ProductDetail, count: number) => void;
}

interface State {
  httpStatus: Status;
  productDetail: ProductDetail;
  productNum: number;
  cartNum: number;
}

const { width, height } = Dimensions.get("window");
class ProductDetailScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    let cartNum = 0;
    this.props.carts.forEach(i => {
      cartNum += i.count;
    });
    this.state = {
      // status fecth data.
      httpStatus: Status.LOADING,
      productDetail: null,
      productNum: 1,
      cartNum: cartNum
    };
  }

  async componentDidMount() {
    // get param from previous screen.
    let product: Product = this.props.navigation.getParam("PRODUCT");
    try {
      // get all product from server.
      let prDetail: ProductDetail = await HttpUtils.requestGet(
        product.product_url
      );
      if (prDetail) {
        this.setState({
          productDetail: prDetail,
          httpStatus: Status.SUCCESS
        });
      } else {
        this.onFetchError();
      }
    } catch (error) {
      this.onFetchError();
    }
  }

  // Có lỗi xảy ra.
  onFetchError() {
    this.setState({
      productDetail: null,
      httpStatus: Status.ERROR
    });
    Alert.alert("", strings.http_error);
  }

  /**
   * render header.
   */
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
        onRightIconPress={() => {
          this.props.navigation.navigate(ScreenName.Cart_Screen);
          // SessionStore.updateBgColor(colors.colorMain);
        }}
        title={"Product".toUpperCase()}
        txtColor={colors.colorWhite}
        rootStyle={{
          backgroundColor: SessionStore.bgColor
        }}
        cartNum={num}
      />
    );
  };

  _renderContentView = () => {
    if (!this.state.productDetail) return null;
    let bottomHeight = 50;
    return (
      <View
        style={{
          flex: 1,
          marginVertical: dimens._20
        }}
      >
        {/* render product infomation */}
        {this._renderInfoView(bottomHeight)}
        {/* product photo */}
        {this._renderTopImage()}
        {/* bottom button action */}
        {this._renderBottomAction(bottomHeight)}
      </View>
    );
  };

  _renderInfoView = bottomHeight => {
    let product = this.state.productDetail;
    return (
      <View
        style={[
          styles.info_container,
          { marginBottom: bottomHeight / 2, backgroundColor: colors.colorWhite }
        ]}
      >
        <View
          style={{
            marginTop: width / 4,
            marginBottom: bottomHeight / 2,
            flex: 1
          }}
        >
          {this._renderInfoTopView(product)}
          {this._renderInfoBottomView(product)}
        </View>
      </View>
    );
  };

  _renderInfoTopView = product => {
    return (
      <View style={styles.info_top}>
        <Text style={styles.product_name}>{product.name.toUpperCase()}</Text>
        {/* product_price */}
        <Text style={styles.product_price}>{`$${product.price} / kg`}</Text>
        <Text
          style={{
            marginTop: dimens._10
          }}
        >
          {`This is description of ${product.name}`}
        </Text>
      </View>
    );
  };

  _renderInfoBottomView = product => {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        {/* action view */}
        {this._renderActionView()}
        {/* price view */}
        {this._renderPriceView(product)}
      </View>
    );
  };

  _renderActionView = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={styles.view_action_seprate} />
        {/* sub button */}
        <TouchableOpacity
          onPress={() => this._onSub()}
          disabled={this.state.productNum == 1}
          style={styles.action_button}
        >
          <Text>-</Text>
        </TouchableOpacity>
        {/* number of product */}
        <Text>{this.state.productNum}</Text>
        {/* plus button */}
        <TouchableOpacity
          onPress={() => this._onPlus()}
          style={styles.action_button}
        >
          <Text>+</Text>
        </TouchableOpacity>

        <View style={styles.view_action_seprate} />
      </View>
    );
  };

  _renderPriceView = product => {
    let price = (this.state.productNum * product.price).toFixed(2);
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 16 }}>PRICE</Text>
        <Text style={{ color: colors.colorRed }}>
          {"$ "}
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>{price}</Text>
        </Text>
      </View>
    );
  };

  _onPlus = () => {
    this.setState({
      productNum: this.state.productNum + 1
    });
  };

  _onSub = () => {
    this.setState({
      productNum: this.state.productNum - 1
    });
  };

  _renderTopImage = () => {
    let uri = BASE_URL + this.state.productDetail.photo_url;
    return (
      <View style={styles.top_image}>
        <Image
          style={{
            height: width / 2,
            width: width / 2
          }}
          source={{ uri: uri }}
          resizeMode="cover"
        />
      </View>
    );
  };

  _renderBottomAction = bottomHeight => {
    return (
      <View style={styles.bottom_action_container}>
        <TouchableOpacity
          onPress={() => this._addToCart()}
          activeOpacity={1}
          style={[
            styles.bottom_action_btn,
            {
              height: bottomHeight,
              borderRadius: bottomHeight / 2
            }
          ]}
        >
          <Text
            style={{
              color: colors.colorWhite
            }}
          >
            ADD TO CART
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert("", "Not enough money");
          }}
          activeOpacity={1}
          style={[
            styles.bottom_action_btn,
            {
              height: bottomHeight,
              borderRadius: bottomHeight / 2
            }
          ]}
        >
          <Text
            style={{
              color: colors.colorWhite
            }}
          >
            BUY NOW
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  async _addToCart() {
    try {
      let cart: Cart = this.props.carts.find(item => {
        return item.product.name == this.state.productDetail.name;
      });
      if (cart) {
        this.props.updateCart(cart.product, cart.count + this.state.productNum);
      } else {
        this.props.pushProductToCart(
          this.state.productDetail,
          this.state.productNum
        );
      }

      // this.props.setCart(carts);

      // luu lai vao database.
      await AsyncStorage.setItem(
        StoreKey.SAVE_CART,
        JSON.stringify(this.props.carts)
      );
    } catch (error) {
      Alert.alert("", "Lưu thất bại");
    }
  }

  render() {
    
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {this._renderContentView()}
        {this.state.httpStatus == Status.LOADING && (
          <ActivityIndicator
            size="large"
            color={colors.colorMain}
            style={styles.indicator}
          />
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCart: (carts: Array<Cart>) => dispatch(setCart(carts)),
    updateCart: (product: ProductDetail, count: number) =>
      dispatch(updateCart(product, count)),
    pushProductToCart: (product: ProductDetail, count: number) =>
      dispatch(pushProductToCart(product, count))
  };
};

const mapStateToProps = state => {
  return {
    cart: state[ReducerConstant.CartReducer].cart,
    carts: state[ReducerConstant.CartReducer].carts,
    testNum: state[ReducerConstant.CartReducer].testNum
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorGrayMain
  },
  action_button: {
    width: dimens._24,
    height: dimens._24,
    borderRadius: dimens._24 / 2,
    backgroundColor: colors.colorGrayMain,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: dimens._15
  },
  view_action_seprate: {
    flex: 1,
    height: 1,
    backgroundColor: colors.colorGrayMain
  },
  product_price: {
    marginTop: dimens._10,
    color: colors.colorBlackMedium,
    fontSize: 14
  },
  product_name: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.colorBlack
  },
  info_top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  info_container: {
    marginTop: width / 4,
    flex: 1,
    marginHorizontal: 10,
    elevation: dimens._2,
    shadowRadius: dimens._2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    borderRadius: dimens._5
  },
  bottom_action_container: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: dimens._2,
    shadowRadius: dimens._2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  bottom_action_btn: {
    width: "40%",
    // flex: 1,
    backgroundColor: colors.colorSub,
    alignItems: "center",
    justifyContent: "center"
  },
  top_image: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    elevation: dimens._2,
    shadowRadius: dimens._2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0
  },
  indicator: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject
  }
});
