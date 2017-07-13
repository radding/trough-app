import React, { Component } from 'react';
import { Outing, User} from './Models';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';
class GroupView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outings: Outing.All()
        }
    }

    render() {
        return (
            <View>
                <View>
                    <View><Text>No</Text></View>
                    <View><Text>Name</Text></View>
                    <View><Text>Preference</Text></View>
                </View>
                {/*{ groups }*/}
            </View>
        )
    }
}

GroupView.navigationOptions = props => {
    const { navigation } = props;
    const { state, setParams, navigate } = navigation;
    const { params } = state;
        return {
            "headerTitle": "Outings",
            "headerLeft": 
                        <Button
                            title="Change Team"
                            onPress={() => {
                            navigate("team_select");
                            }}
                        />
        }
}
export default GroupView;

const styles = StyleSheet.create({ });