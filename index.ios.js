/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import {
  StackNavigator,
} from 'react-navigation';

import Trough from "./src/main.js";

const App = StackNavigator({
  Main: {screen: Trough}
});


AppRegistry.registerComponent('Trough', () => App);
