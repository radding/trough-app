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

export default class Trough extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: globals.user.isLoggedIn
        }
        this.setLoggedin = this.setLoggedin.bind(this);
    }

    setLoggedin(user) {
        this.setState({
            user: user,
            isLoggedIn: user !== null ? user.isLoggedIn : false
        });
    }

    render() {
        if(!this.state.isLoggedIn) {
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