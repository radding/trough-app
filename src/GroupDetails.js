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
			outing = await Outing.Join({
				//user: user.json
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
		var outing = this.props.navigation.state.params.outing

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
				<Text style={styles.title}>{outing["name"]}</Text>
					<Text> {outing["creator"]["email"]} is going to
					<Text style={styles.emphasis}> {outing["place"]["name"]}</Text>  </Text>
					<Text>On {moment(outing["departure_time"]).format('MM/DD/YYYY')} </Text>
					<Text>At {moment(outing["departure_time"]).format('hh:mm A')} </Text>
				<Text>{"\n"}These people are attending: </Text>
					{attendees}
				<Text>{"\n"}</Text>
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
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 30
	},
	emphasis: {
		fontWeight: 'bold'
	},
	overall: {
		width: "75%"
	},
	button: {
		margin:30
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);