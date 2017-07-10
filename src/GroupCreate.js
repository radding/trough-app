import React, { Component } from 'react';
import {User} from './Models';
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

export default class GroupView extends Component {
  constructor(props) {
      super(props);
			this.state = {
				name: undefined,
				place_name: undefined,
				datetime: undefined,
				errorMessages: []
			}
			this.groupCreate = this.groupCreate.bind(this)
  }

	async groupCreate() {
		this.setState({errorMessages: []})
		try {
			var group = await Group.Create({
				outing: {
          name: this.state.name,
          user_id: globals.user.user_id,
          place: {
            name: this.state.place_name
          },
          departure_time: this.state.datetime
        }
			}); 
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
				console.warn("Something went horribly wrong in Group Creation");
		}	
}

	render() {
	  return (
	    <View style={styles.container}>
	      {this.state.errorMessages}
	    	<View style={styles.overall}>
	  			<TextInput
						value={this.state.name}
						onChangeText = {(text) => this.setState({name: text})}
						placeholder="Group Name"
					/>
					<TextInput
						value={this.state.address}
						onChangeText = {(text) => this.setState({address:text})}
						placeholder="Location Address"
					/>
					<DatePicker
						style={{width: 200}}
						date={this.state.datetime}
						mode="datetime"
						format="YYYY-MM-DD HH:mm"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
						}}
						minuteInterval={10}
						onDateChange={(datetime_in) => {this.setState({datetime: datetime_in});}}
					/>
					<View>
						<Button
							style={styles.button}
							title="Create Group"
							onPress={() => {console.warn("Group create not yet developed")}}
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