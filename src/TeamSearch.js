import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from 'react-native';

import Autocomplete from "react-native-autocomplete-input"

import { Team } from "./Models";

export default class TeamSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            teamName: undefined,
        }
        this._getTeams = this._getTeams.bind(this);
        this.moveOn = this.moveOn.bind(this);
        
    }

    async _getTeams() {
        var teams = await Team.All();
        this.setState({
            teams: teams, 
            data: teams
        });
    }

    componentWillMount() {
        this._getTeams();
    }

    async moveOn() {
        const { navigate } = this.props.navigation;
        var team = await Team.Match(this.state.teamName);
        navigate('user_details', {team: team})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.overall}>
                    {/*<View>*/}
                        {/*<Autocomplete
                            autoCapitalize="none"
                            autoCorrect={false}
                            data={this.state.data}
                            defaultValue={this.state.teamName}
                            onChangeText={text => this.setState({ teamName: text })}
                            placeholder="Enter Your Team Name"
                            renderItem={data => {
                                <TouchableOpacity onPress={() => this.setState({ teamName: data.name })}>
                                    <Text>{data.name}</Text>
                                </TouchableOpacity>
                            }}
                        />*/}
                    {/*</View>*/}
                    {/*<Button
                        title="Continue"
                    />*/}
                    <TextInput 
                        value={this.state.teamName}
                        onChangeText = {(text) => this.setState({teamName: text})}
                        placeholder="Team Name"
                    />
                    <Button
                        title="Continue"
                        onPress={this.moveOn}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    overall: {
        width: "75%"
    },

    abs: {
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    }
}