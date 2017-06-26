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
					//name: undefined,
					//address: undefined,
					date: undefined,
					//creator: undefined,
					errorMessages: []
				}
        //name: Object
        //creator: Object

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
							date={this.state.datetime1}
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
							onDateChange={(datetime) => {this.setState({datetime1: datetime});}}
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