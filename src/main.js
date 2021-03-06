import React, { Component } from 'react';
import {User} from './Models';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';

import globals from "./globals.js";
import SignIn from "./signin.js";
import Feed from "./Feed.js";
import GroupView from "./GroupView.js";
import GroupDetails from "./GroupDetails.js";
import { connect } from "react-redux";

// import Trough from "./main.js";
import TeamSearch from "./TeamSearch.js";
import UserDetails from "./UserDetails.js";
import {
  StackNavigator,
} from 'react-navigation';

import { mapStateToProps, mapDispatchToProps } from "./utils";

import GroupCreate from "./GroupCreate";
import Places from "./Places";
import TeamSelect from "./TeamSelect.js";

const LandingScreen = StackNavigator({
  Main: {screen: SignIn},
  signup: {screen: TeamSearch},
  user_details: {screen: UserDetails}
});


const ViewGroup = StackNavigator({
  main: {screen: GroupView},
  create: {screen: GroupCreate},
  details: {screen: GroupDetails},
  team_select: {screen: TeamSelect},
  team_create: {screen: TeamSearch}
})

class Trough extends Component {

    render() {
        if(!this.props.user) {
            return ( <LandingScreen /> );
        }
        else {
            // while (true)
                // console.warn(this.props.navigation.pop());
            return (<ViewGroup />);
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  overall: {
    width: "75%"
  },
  button: {
    margin:30
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trough);