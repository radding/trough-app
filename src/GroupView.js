import React, { Component } from 'react';
<<<<<<< HEAD
import { Group } from './Models';
=======
import {User} from './Models';
>>>>>>> 052fb42b6f87b5a4e9419282b88d310e57c6c044
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
<<<<<<< HEAD
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
=======
        return (
            <View style={styles.container}>
>>>>>>> 052fb42b6f87b5a4e9419282b88d310e57c6c044
            </View>
        )
    }
}

const styles = StyleSheet.create({ });