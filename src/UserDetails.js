import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class UserDetails extends Component {
  constructor(props) {
			super(props);
			this.state = {
				email: undefined,
				password: undefined,
				confirmPassword: undefined
			}
  }
  render() {
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