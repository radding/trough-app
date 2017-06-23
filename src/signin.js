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

export default class SignIn extends Component {
  constructor(props) {
      super(props);
      this.state = {
          email: undefined,
          password: undefined,
				  errorMessages: []
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
      this.props.main.setLoggedin(user);
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
        console.warn("Something went horribly wrong " + JSON.stringify(errors));
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
                <Button
                    style={styles.button}
                    title="Sign Up"
                    onPress={() =>
                        navigate('signup', { main: this.props.main})
                    }
                />

                <Button
                    title="Login"
                    onPress= {this.userLogin}
                />
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
  button: {
    margin:30
  },
});