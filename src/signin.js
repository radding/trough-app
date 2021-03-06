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

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./utils";
import store from "./Store.js"

class SignIn extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email: undefined,
          password: undefined,
				  errorMessages: [],
      }
      this.userLogin = this.userLogin.bind(this);
  }
  
  async userLogin()
  {
  	this.setState({errorMessages: []})
    try {
      var user = await User.Login({
                  email: this.state.email,
                  password: this.state.password});
      user.syncWithApi().then( () => {
         if (user.teams.length == 0) {
          this.props.login_user(null);
          throw "User is not part of a team for some reason";
        }
        let action = this.props.set_team(user.teams[0]);
        store.dispatch(action);
      }); 
		  let action = this.props.login_user(user);
      store.dispatch(action);
    }
    catch (errors) {
      if(errors.user_error) {
        var parsed_errors = errors['details']['errors'].map((error) => {
          return (
            <Text key={error}> {error} </Text>
          )
        });
        this.setState({errorMessages: parsed_errors});
      }
      else
        throw errors;
        console.warn("Something went horribly wrong in userLogin() " + JSON.stringify(errors));
    }	
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.errorMessages}
        <View style={styles.overall}>
            <TextInput
                value={this.state.email}
                onChangeText = {(text) => this.setState({email: text})}
                placeholder="Email"
            />
            <TextInput
                value={this.state.password}
                onChangeText = {(text) => this.setState({password: text})}
                placeholder = "Password"
                secureTextEntry={true}
            />
            <View>
                <View style={styles.buttons}>
                  <Button
                    style={styles.button}
                    title="Login"
                    onPress= {this.userLogin}
                  />
                </View>
                <View style={styles.buttons}>
                  <Button
                    style={styles.button}
                    title="Sign Up"
                    onPress={() =>
                        navigate('signup', { main: this.props.main, action: (navigation, team) => {
                          navigation.navigate('user_details', {team: team})
                        }})
                    }
                  />
                </View>
            </View>
        </View>
      </View>
    );
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
  buttons: {
    margin: 10
  },
  button: {
    padding: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);