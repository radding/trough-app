import React, { Component } from 'react';
import {User} from './Models';
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

        for(let i = 0; i < groups.length; i++){
            groups.push(
                <View key = {i}>
                    <View>
                        <TextInput />
                    </View>
                    <View>
                        <TextInput />
                    </View>
                    <View>
                        <TextInput />
                    </View>
                </View>
            )
        }
        
        return (
            <View>
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