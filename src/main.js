import React, { Component } from 'react';
import {User} from './Models';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class Trough extends Component {
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
      Alert.alert("Email: " + email + "Password: " + passord)
    var user = await User.Login({
                email: this.state.email,
                password: this.state.password});
      Alert.alert(user.email);
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
        console.warn("Something went horribly wrong");
    }	
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.overall}>
            <TextInput
                value={this.state.email}
                onChangeText = {(text) => this.setState({email: text})}
                placeholder="Email"
            />
            <TextInput
                value={this.state.password}
                onChangeText = {(text) => this.setState({passord: text})}
                placeholder = "Password"
                secureTextEntry={true}
            />
            <View>
                <Button
                    style={styles.button}
                    title="Sign Up"
                    onPress={() =>
                        navigate('signup')
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