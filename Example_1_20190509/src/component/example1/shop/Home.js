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

const ShopAction = {
  None: 0,
  Later: 1,
  PlaceOrder: 2
};

const datas = [
  {
    id: 0,
    icon: images.mac_12inch_2018,
    name: "Macbook 12 inch 2018",
    description: "Macbook 12 inch 2018 MRQN2 Core M3 256GB 8GB RAM – NEW",
    price: 1356,
    count: 0
  },
  {
    id: 1,
    icon: images.macpro_retina_13inch_2015,
    name: "Macbook Pro Retina 13 inch 2015",
    description:
      "Macbook Pro Retina 13 inch 2015 MF840 Core i5 8GB 256GB Like new",
    price: 1000,
    count: 0
  },
  {
    id: 2,
    icon: images.macpro_touchbar_13inch,
    name: "Macbook Pro TouchBar 13 inch 2017",
    description:
      "Macbook Pro TouchBar 13 inch 2017 MPXV2 Core i5 256GB 8GB RAM – Like new",
    price: 1360,
    count: 0
  },
  {
    id: 3,
    icon: images.macpro_touchbar_15inch,
    name: "Macbook 12 inch 2018",
    description: "Macbook 12 inch 2018 MRQN2 Core M3 256GB 8GB RAM – NEW",
    price: 1174,
    count: 0
  }
];

const { width, height } = Dimensions.get("window");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionAction: ShopAction.PlaceOrder,
      datas: datas
    };
  }

  _renderHeader = () => {
    return (
      <Header
        title="Shop"
        rightIcon="shopping-basket"
        leftIcon="chevron-left"
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
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
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
          source={item.icon}
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
                {item.name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: "gray",
                  fontSize: 12
                }}
              >
                {item.description}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: "red"
                }}
              >{`$${item.price}`}</Text>
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
              onPress={() => this.onPlus(item)}
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
                {item.count}
              </Text>
            </TouchableOpacity>
            {/* render Subtraction action */}
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.onSub(item)}
              disabled={item.count == 0}
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
        if (item.id == i.id) {
          return { ...i, count: i.count + 1 };
        }
        return i;
      })
    });
  }

  onSub(item) {
    this.setState({
      datas: this.state.datas.map(i => {
        if (item.id == i.id) {
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
      total = total + item.count * item.price;
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
    let isLaterActive = this.state.actionAction == ShopAction.Later;
    let isPlaceOrderActive = this.state.actionAction == ShopAction.PlaceOrder;
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
              actionAction: ShopAction.Later
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
              actionAction: ShopAction.PlaceOrder
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
