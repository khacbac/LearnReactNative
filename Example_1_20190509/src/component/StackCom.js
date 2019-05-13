import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import ScreenName from './ScreenName';
import Home from './example1/shop/Home';
import CategoryScreen from './example2/CategoryScreen';
import ProductScreen from './example2/product/ProductScreen';
import ProductDetail from './example2/product/ProductDetail';

const StackApp = createStackNavigator(
    {
        [ScreenName.Example1]: {
            screen: Home,
        },
        [ScreenName.Categories]: {
            screen: CategoryScreen,
        },
        [ScreenName.Product]: {
            screen: ProductScreen,
        },
        [ScreenName.Product_Detail]: {
            screen: ProductDetail,
        },
    },
    navigationOptions = {
        headerMode: "none",
        initialRouteName: ScreenName.Categories,
    },
);

const StackContainer = createAppContainer(StackApp);

export default class StackCom extends Component {
    render() {
        return <SafeAreaView style={{ flex: 1 }}>
            <StackContainer />
        </SafeAreaView>
    }
}

