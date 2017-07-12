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

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./utils";


class GroupView extends Component {
  constructor(props) {
      super(props);
			this.state = {
				name: undefined,
				address: undefined,
				datetime: moment(),
				errorMessages: [],
				place: {name: undefined},
				places: []
			}
			this.groupCreate = this.groupCreate.bind(this);
			this._getplace = this._getplace.bind(this);
  }

	async groupCreate() {
		this.setState({errorMessages: []})
		await Outing.Create({
			name: this.state.name,
			creator: this.props.user,
			place: {
				name: this.state.place.name,
				google_place: this.state.place.place_id,
				rating: 0
			},
			team_id: 1,
			departure_time: this.state.datetime
		});
		try {
			var group = await Group.Create({
				outing: {
          name: this.state.name,
          user_id: this.props.user.id,
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
						onDateChange={(datetime_in) => {this.setState({datetime: moment(datetime_in)});}}
					/>
					<View>
						<Button
							style={styles.button}
							title="Create Group"
							onPress={this.groupCreate}
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
