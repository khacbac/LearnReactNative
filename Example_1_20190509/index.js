/**
 * @format
 */

import { AppRegistry, View } from "react-native";
import React, { Component } from "react-native";
// import App from "./App";
import { name as appName } from "./app.json";
import Home from "./src/component/example1/shop/Home";
import CategoryScreen from "./src/component/example2/CategoryScreen";
import StackCom from "./src/component/StackCom";
// import Home from './src/component/shop/Home';


// AppRegistry.registerComponent(appName, () => Home);
AppRegistry.registerComponent(appName, () => StackCom);
