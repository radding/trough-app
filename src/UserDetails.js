import React, { Component } from 'react';
import CheckBox from 'react-native-checkbox';
import {User} from './Models';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';
import { connect } from "react-redux";
import store from "./Store.js"

import { mapStateToProps, mapDispatchToProps } from "./utils";

class UserDetails extends Component {
  constructor(props) {
	super(props);
	this.state = {
		email: undefined,
		password: undefined,
		password_confirmation: undefined,
		overTwentyOne: false,
		errorMessages: []
	}
	this.userCreate = this.userCreate.bind(this)
  }

  async userCreate()
  {
  	this.setState({errorMessages: []})
  	try {
  		var user = await User.Create({
			email: this.state.email,
			password: this.state.password,
			password_confirmation: this.state.password_confirmation
		});
  		var team = this.props.navigation.state.params.team;
  		await user.addTeam(team);
		let action = this.props.login_user(user);
      	store.dispatch(action);
	}
	catch (errors) {
		if(errors.user_error) {
			var parsed_errors = errors['details']['full_messages'].map((error) => {
				return (
					<Text key={error}> {error} </Text>
					)
			});
			this.setState({errorMessages: parsed_errors});
		}
		else
			console.warn("Something went horribly wrong: " + JSON.stringify(errors));
			throw errors;
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
						placeholder="Password"
						secureTextEntry={true}
					/>
					<TextInput
						value={this.state.password_confirmation}
						onChangeText = {(text) => this.setState({password_confirmation: text})}
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
							onPress={this.userCreate}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);