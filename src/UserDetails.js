import React, { Component } from 'react';
import CheckBox from 'react-native-checkbox';
import {
  AppRegistry,
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
						onChangeText = {(text) => this.setState({text})}
						placeholder="Email"
					/>
					<TextInput
						value={this.state.password}
						onChangeText = {(text) => this.setState({text})}
						placeholder="Password"
						secureTextEntry={true}
					/>
					<TextInput
						value={this.state.confirmPassword}
						onChangeText = {(text) => this.setState({text})}
						placeholder="Confirm Password"
						secureTextEntry={true}
					/>
					<CheckBox
						checked={this.state.confirmPassword}
						label="Are you over 21 years old?"
						onChange={(checked) => {this.setState({overTwentyOne: !checked})}}
					/>
					<View>
						<Button
							style={styles.button}
							title="Sign Up"
							onPress={() => { 
								fetch('https://mywebsite.com/endpoint/', {
									method: 'POST',
									headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',	
									},
									body: JSON.stringify({
										email: this.state.email,
										password: this.state.password,
										password_confirmation: this.state.confirmPassword 
										// TODO: include age parameter later
									})
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