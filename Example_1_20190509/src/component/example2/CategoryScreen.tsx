import * as React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Alert,
  ImageBackground,
  AsyncStorage
} from "react-native";
import HeaderV2 from "../../module/ui/HeaderV2";
import colors from "../../res/colors";
import MethodName from "../../module/http/MethodName";
import ScreenName from "../ScreenName";
import dimens from "../../res/dimens";
import images from "../../res/drawable/images";
import SessionStore from "../SessionStore";
import Category from "../../module/model/Category";
import strings from "../../res/strings";
import HttpUtils, { Status } from "../../module/http/HttpUtils";
import StoreKey from "../StoreKey";
import { connect } from "react-redux";
import ProductDetail from "../../module/model/ProductDetail";
import ReducerConstant from "./redux/reducers/ReducerContant";
import { setCart } from "./redux/actions/CartAction";
import Cart from "../../module/model/Cart";

const { width, height } = Dimensions.get("window");
const colorBgs = ["#ff9900", "#ff3333", "#e65c00", "#e6e600", "#cc0066"];
const categoryImages = [
  // images.fruit_background,
  images.fruit_background_1,
  images.fruit_background_2,
  images.fruit_background_3
];

interface Props {
  navigation: any;
  setCart: (carts: Array<Cart>) => void;
}

interface State {
  categoryList: Array<Category>;
  httpStatus: Status;
}

class CategoryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      httpStatus: Status.LOADING
    };
  }

  async componentDidMount() {
    let categoryList = [];
    try {
      let cs = await HttpUtils.requestGet(MethodName.GET_CATEGORIES);
      await this.loadData();
      if (cs && cs.categories) {
        cs.categories.forEach(item => {
          // item.bgColor = colorBgs[Math.floor(Math.random() * colorBgs.length)];
          let ct = new Category();
          ct.bgColor = colorBgs[Math.floor(Math.random() * colorBgs.length)];
          ct.category_url = item.category_url;
          ct.name = item.name;
          categoryList.push(ct);
        });
        categoryList = categoryList.filter(item => {
          return item.name;
        });
        this.setState({ categoryList, httpStatus: Status.SUCCESS });
      } else {
        this.onFetchError();
      }
    } catch (error) {
      this.onFetchError();
    }
  }

  // load data tu DB.
  async loadData() {
    AsyncStorage.getItem(StoreKey.SAVE_CART)
      .then(res => {
        let carts = JSON.parse(res);

        if (carts) {
          this.props.setCart(carts);
        }
      })
      .catch(err => {
        Alert.alert("", strings.http_error);
      });
  }

  // Có lỗi xảy ra.
  onFetchError() {
    this.setState({
      categoryList: [],
      httpStatus: Status.ERROR
    });
    Alert.alert("", strings.http_error);
  }

  /**
   * render header.
   */
  _renderHeader = () => {
    return (
      <HeaderV2
        leftIcon="bars"
        rightIcon="search"
        title={"Categories".toUpperCase()}
        txtColor={colors.colorWhite}
        rootStyle={{
          backgroundColor: SessionStore.bgColor
        }}
      />
    );
  };

  /**
   * render main view.
   */
  _renderContentView = () => {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <FlatList
          data={this.state.categoryList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.name}
        />
        {this.state.httpStatus == Status.LOADING && (
          <ActivityIndicator
            size="large"
            color={colors.colorMain}
            style={styles.indicator}
          />
        )}
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.gotoProduct(item)}
        style={[styles.item_list_container]}
      >
        <ImageBackground
          style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}
          source={
            categoryImages[Math.floor(Math.random() * categoryImages.length)]
          }
        >
          <Text style={[styles.item_list_txt, { color: item.bgColor }]}>
            {item.name.toUpperCase()}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  gotoProduct(item) {
    SessionStore.updateBgColor(item.bgColor);
    this.props.navigation.navigate(ScreenName.Product, { CATEGORY: item });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        {this._renderHeader()}
        {this._renderContentView()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCart: (carts: Array<Cart>) =>
      dispatch(setCart(carts))
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
)(CategoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item_seprate: {
    height: 1,
    backgroundColor: colors.colorWhite
  },
  indicator: {
    position: "absolute",
    ...StyleSheet.absoluteFillObject
  },
  item_list_container: {
    height: height / 5,

    justifyContent: "center"
    // paddingHorizontal: dimens._20
  },
  item_list_txt: {
    fontSize: 20
  }
});
