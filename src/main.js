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
import GroupCreate from "./GroupCreate.js";
import { connect } from "react-redux";

// import Trough from "./main.js";
import TeamSearch from "./TeamSearch.js";
import UserDetails from "./UserDetails.js";
import {
  StackNavigator,
} from 'react-navigation';

import { mapStateToProps, mapDispatchToProps } from "./utils";

// import GroupCreate from "./src/GroupCreate";
import Places from "./Places";

const LandingScreen = StackNavigator({
  Main: {screen: SignIn},
  signup: {screen: TeamSearch},
  user_details: {screen: UserDetails}
});

const CreateGroup = StackNavigator({
  main: {screen: GroupCreate},
  places: {screen: Places}
});

class Trough extends Component {

    render() {
        if(!this.props.user) {
            return ( <LandingScreen /> );
        }
        else {
            // while (true)
                // console.warn(this.props.navigation.pop());
            return (<CreateGroup />);
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