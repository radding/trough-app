import React, { Component } from 'react';
import { 
    Group,
    User
} from './Models';
import GroupCreate from "./GroupCreate.js";
import DatePicker from 'react-native-datepicker';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Alert
} from 'react-native';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datetime: undefined,
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        //get all outings
        let outings = [];

        for (let i = 0; i < 6; i++) {
            outings.push(
                <View id={i} key={i} style={styles.container} >
                    <View style={styles.creator} >
                        <Text style={{fontSize: 18,}}>Jonathan Lehto</Text>
                    </View>
                    <View style={styles.outingInfo} >
                        <Text style={{fontSize: 16}}>22 People are going Hopcat for Drinks on June 3, 4:00pm! Select for more information!</Text>
                    </View>
                    <View style={{flexDirection: "row", justifyContent: 'space-between',}} >
                        <View style={{flex: 1, borderRightColor: "#000"}}>
                            <Button onPress={() => {}} title="Join This outing" style={{flex: 1, width: "50%",}} />
                        </View>
                        <View style={{flex: 1,}}>
                            <Button onPress={() => {}} title="Hide This outing" style={{flex: 1, width: "50%",  backgroundColor: "#FFFF00"}} />
                        </View>
                    </View>
                </View>
            )
        }
        
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper}>
                <View style={{ marginBottom: 30,}}>
                    <View style={styles.outingInfo} >
                        <Text style={{marginTop: 10, marginBottom: 10, fontSize: 24, justifyContent: "center", alignSelf: "center",}}>
                            You are in Team ASDFDASF
                        </Text>
                        <View style={{width: "100%"}}>
                            <Button 
                                style={{marginTop: 10, flex: 1}} 
                                onPress={() => {
                                    <GroupCreate navigation={this.props.navigation} main={this} />
                                }} 
                                title="Create outing" 
                            />
                        </View>
                    </View>
                </View>
                { outings }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "column",
        flex: 1,
        width: "100%",
        alignSelf: 'center',
    },
    container: {
        flexDirection: "column",
        backgroundColor: "#FFF",
        marginBottom: 30,
        borderColor: "#000",
        borderRadius: 5,
    },
    creator: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#CCC",
    },
    outingInfo: {
        flex: 1,
        padding: 10,
        flexDirection: "column",
        alignItems: 'center',
    },
});