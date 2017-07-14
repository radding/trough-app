import React, { Component } from 'react';
import { Outing, User} from './Models';

import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

import reactMixin from "react-mixin";
import TimerMixin from 'react-timer-mixin';

import store from "./Store.js";

class Group extends Component {
    render() {
        const { navigate } = this.props.navigation        
        return (
            <TouchableOpacity onPress={ _ => {
                {/*navigate("")*/}
                console.warn("Not implemented");
            } }>
                <Text>{this.props.group.creator.name} is going to {this.props.group.place.name}.</Text>
                <Text>Want to Join?</Text>
                <View>
                    <Button 
                        title="No"
                        onPress={() => console.warn("Pressed No")}
                    />
                    <Button 
                        title="Yes"
                        onPress={() => console.warn("Pressed Yes")}
                    />
                </View>

            </TouchableOpacity>
        )

    }
}

class GroupView extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            outings: []
        }
        store.subscribe(() => {
            let state = store.getState();
            team = state.usersReducers.team;
            Outing.current_team = team;
            this.setOutings();
        })

    }

    componentWillMount() {
    }

    setOutings = async () => {
        if (Outing.current_team.id >= 0) {
            let outings = await Outing.All({exclude_me: true});
            this.setState({
                outings: outings
            })
        }
    }

    _renderNone = () => {
        const { navigate } = this.props.navigation;
        return (
            
            <View>
                <Text>There are no Group outings, Create one now</Text>
                <Button 
                    title="Create an Outing"
                    onPress={() => {
                        navigate("create");
                    }}
                />
            </View>
        )
    }

    _renderAll = () => {
        return (
            <View>
                <SwipeListView 
                    dataSource={this.ds.cloneWithRows(this.state.outings)}
                    renderRow={(group) => <Group group={group} navigation={this.props.navigation} /> }
                    renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
								<Text>Left</Text>
								<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
									<Text style={styles.backTextWhite}>Right</Text>
								</View>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
									<Text style={styles.backTextWhite}>Delete</Text>
								</TouchableOpacity>
							</View>
						)}
                />
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.state.outings.length > 0 ? this._renderAll() : this._renderNone()}
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

reactMixin(GroupView.prototype, TimerMixin);
export default GroupView;

const styles = StyleSheet.create({ });