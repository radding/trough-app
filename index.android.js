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
import TeamSearch from "./src/TeamSearch.js"

const App = StackNavigator({
  Main: {screen: Trough},
  signup: {screen: TeamSearch}
});


AppRegistry.registerComponent('Trough', () => App);
