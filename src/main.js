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

import { mapStateToProps, mapDispatchToProps } from "./utils";

class Trough extends Component {

    render() {
        if(!this.props.user) {
            return ( <SignIn navigation={this.props.navigation} main={this} /> );
        }
        else {
            return (<GroupCreate navigation={this.props.navigation} main={this} />);
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