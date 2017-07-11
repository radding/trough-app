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
import TeamSearch from "./src/TeamSearch.js";
import UserDetails from "./src/UserDetails.js"

// import store from "./src/Store.js";
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux";
import { usersReducers } from "./src/reducers";

let store = createStore(combineReducers({usersReducers}));

export default store;

const AppNav = StackNavigator({
  Main: {screen: Trough},
  signup: {screen: TeamSearch},
  user_details: {screen: UserDetails}
});

// const CreateGroup = StackNavigator({
//   main: {screen: GroupCreate},
//   places: {screen: Places}
// })

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Trough />
      </Provider>
    )
  }
}
AppRegistry.registerComponent('Trough', () => App);
