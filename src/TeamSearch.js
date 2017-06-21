import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Team } from "./Models";

export default class TeamSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
        this._getTeams = this._getTeams.bind(this);
        
    }

    async _getTeams() {
        var teams = await Team.All();
        this.setState({
            teams: teams
        });
    }

    componentWillMount() {
        this._getTeams();
    }

    render() {
        return (
            <View>
                {this.state.teams.map((obj) => (<Text>{obj.name}</Text>))}
                <Text>It worked!!</Text>
            </View>
        )
    }
}