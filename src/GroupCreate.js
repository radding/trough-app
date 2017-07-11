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
				address: undefined,
				datetime: undefined,
				errorMessages: [],
				place: {name: undefined},
				places: []
			}
			this.groupCreate = this.groupCreate.bind(this);
			this._getplace = this._getplace.bind(this);
  }

	async groupCreate() {
		this.setState({errorMessages: []})
		try {
			{/*
			TODO: 
				make create function
				Figure out what needs to be sent
			var group = Group.Create(await ({});
			*/}
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

	_getplace(place) {
		this.setState({
			place: place
		});
	}

	render() {
		 const { navigate } = this.props.navigation;
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
                value={this.state.place.name}
                onFocus={() => {
									this.refs.places.blur();
									navigate('places', {onComplete: this._getplace, place: this.state.place});
								}}
                placeholder="Where do you want to go?"
								ref="places"
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