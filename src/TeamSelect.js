import React, { Component, PureComponent } from 'react';
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
  FlatList,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { mapStateToProps, mapDispatchToProps } from "./utils";
import { connect } from "react-redux";
import store from "./Store.js"

window.store = store;

class Team extends Component {
    render() {
        return (
            <TouchableHighlight onPress={ () => {
                this.props.choose(this.props.team);
            } } style={this.props.isCurrent ? styles.isCurrent : styles.row}>
                <View>
                    <Text style={styles.title}>{this.props.team.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}


class TeamSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            teams: props.user.teams
        }
    }

    state = {selected: (new Map(): Map<string, boolean>)};

    choose = (team) => {
        let action = this.props.set_team(team);
        store.dispatch(action);
        this.props.navigation.goBack();

    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <Team
            id={item.id}
            team={item}
            choose={this.choose}
            title={item.name}
            isCurrent={Outing.current_team.id === item.id}
        />
    )

	render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Button
                    title="Create Group"
                    onPress={() => {navigate("team_create", { action: (navigation, team) => {
                        let user = new User(this.props.user);
                        user.headers = this.props.user.headers;
                        this.props.login_user(user);
                        var teams = this.state.teams.slice();
                        teams.push(team);
                        this.setState({
                            teams: teams
                        })
                        navigation.goBack();

                    }})}}
                />
                <FlatList
                    data={this.state.teams}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
	}
}
const row = {
        width: Dimensions.get('window').width,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 5,
        marginBottom: 5,
    }
const styles = {
    row: {
        ...row,
        backgroundColor: "white"        
    },
    isCurrent: {
        ...row,
        backgroundColor: "#bada55"
    },
    title: {
        textAlign: "center"
    }
}

connect(mapStateToProps, mapDispatchToProps)(Team);

export default connect(mapStateToProps, mapDispatchToProps)(TeamSelect);