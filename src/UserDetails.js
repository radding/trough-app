import React, { Component } from 'react';
import CheckBox from 'react-native-checkbox';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

export default class UserDetails extends Component {
  constructor(props) {
			super(props);
			this.state = {
				email: undefined,
				password: undefined,
				confirmPassword: undefined,
				overTwentyOne: false
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
						onChangeText = {(text) => this.setState({password: text})}
						placeholder="Password"
						secureTextEntry={true}
					/>
					<TextInput
						value={this.state.confirmPassword}
						onChangeText = {(text) => this.setState({confirmPassword: text})}
						placeholder="Confirm Password"
						secureTextEntry={true}
					/>
					<CheckBox
						checked={this.state.overTwentyOne}
						label="Are you over 21 years old?"
						onChange={(checked) => {this.setState({overTwentyOne: !checked})}}
					/>
					<View>
						<Button
							style={styles.button}
							title="Sign Up"
							onPress={() => { 
								fetch("https://trough-api.herokuapp.com/auth/", {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json'	
									},
									body: JSON.stringify({
										email: this.state.email,
										password: this.state.password,
										password_confirmation: this.state.confirmPassword
									})
								})
								.then((response) => response.json())
								.then((responseJson) => {
									//Do something about session
									if (responseJson["status"] === "success") {
										Alert.alert("You are now registered!");
									}
									else {
										Alert.alert(responseJson["errors"]["full_messages"][0]);
									}
								})
								.catch((error) => {
									console.error(error);
								})
							}}
						/>
					</View>
				</View>
			</View>
		)
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