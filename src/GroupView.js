import React, { Component } from 'react';
import { Group, User} from './Models';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';

export default class GroupView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var groups = [];

        for (let i = 0; i < groups.length; i++) {
            groups.push(
                <View key = {i}>
                    <View>
                        //Image of the group creator
                        <Image />
                        <Text value={groups.get(i).groupCreator} />
                    </View>
                    //View
                    <View>
                        //Where are we going
                        <Text value={groups.get(i).groupName}/>
                        //Who created Group
                        <Text value="Would you like to join the group?"/>
                        //Total # of people going + drop down/Link
                        <View>
                            <Text value={groups.get(i).attendees} />
                            <Image />
                        </View>
                    </View>
                </View>
            )
        }
        
        return (
            <View>
                //Create New Group?
                <View>
                    <View><Text>No</Text></View>
                    <View><Text>Name</Text></View>
                    <View><Text>Preference</Text></View>
                </View>
                { groups }
            </View>
        )
    }
}

const styles = StyleSheet.create({ });