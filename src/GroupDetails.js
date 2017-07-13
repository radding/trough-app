import React, { Component } from 'react';
import {User, Outing} from './Models';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { mapStateToProps, mapDispatchToProps } from "./utils";
import { connect } from "react-redux";

class GroupDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
      	errorMessages: []
      }
      this.joinOuting = this.joinOuting.bind(this);
  }

  async joinOuting() {
  	this.setState({errorMessages: []})
  	console.warn("hello")
  	try {
			await Outing.Join({
				
			});
		}
		catch (errors) {
			// var parsed_errors = errors['details']['full_messages'].map((error) => {
			// 	return (
			// 		<Text key={error}> {error} </Text>
			// 		)
			// });
			this.setState({errorMessages: errors});
		}	
  }

	render() {
		outing = {
			"name": "testOuting",
			"team_id": 1,
			"departure_time": "2000-01-01T12:00:00.000",
			"place": {
				"id": 1,
				"google_place": "FOOBAR google_place string",
				"name": "foobar"
			},
			"creator": {
				"id": 1,
				"uid": "test@email.com",
				"name": null,
				"email": "test@email.com",
				"teams":[{
					"id": 1,
					"created_at": "junk",
					"updated_at": "junk",
					"name": "snackers"
				}]
			},
			"users": [{
				"id": 2,
				"uid": "test2@email.com",
				"name": null,
				"email": "test2@email.com",
				"teams":[{
					"id": 1,
					"created_at": "junk",
					"updated_at": "junk",
					"name": "snackers"
				}]
			}]
		};

		var attendees = [];
		for (let i = 0; i < outing["users"].length; i++) {
			 attendees.push(
            <View key={i}>
                <Text> {outing["users"][i]["email"]} </Text>
            </View>
       )
		}


		//console.warn(outing["departure_time"]);
		return( 
			<View style={styles.container}>
				{this.state.errorMessages}
				<Text style={styles.category}> Title:</Text>
					<Text> {outing["name"]} </Text>
				<Text style={styles.category}> Creator:</Text>
					<Text> {outing["creator"]["email"]} </Text>
				<Text style={styles.category}> Place:</Text>
					<Text> {outing["place"]["name"]} </Text>
				<Text style={styles.category}> Date:</Text>
					<Text> {moment(outing["departure_time"]).format('MM/DD/YYYY')}</Text>
				<Text style={styles.category}> Time:</Text>
					<Text> {moment(outing["departure_time"]).format('hh:mm A')}</Text>
				<Text style={styles.category}> Attendees: </Text>
				{attendees}
				<Button
						style={styles.button}
						title="Join this Outing"
						onPress= {this.joinOuting}
				/>
			</View>)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	category: {
		fontWeight: 'bold',
		textDecorationLine: 'underline'
	},
	overall: {
		width: "75%"
	},
	button: {
		margin:30
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);