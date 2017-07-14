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
import { mapStateToProps, mapDispatchToProps } from "./utils";
import { connect } from "react-redux";

class Group extends Component {
    render() {
        const { navigate } = this.props.navigation        
        return (
            <TouchableOpacity onPress={ _ => {
                {/*navigate("")*/}
                console.warn("Not implemented");
            } } style={styles.row} >
                <Text>{this.props.group.creator.name} is going to {this.props.group.place.name}.</Text>
                <Text>Want to Join?</Text>
                <View>
                    <Button 
                        title="No"
                        onPress={() => this.props.remove(this.props.group)}
                    />
                    <Button 
                        title="Yes"
                        onPress={() => {
                            this.props.add(this.props.group);
                            this.props.remove(this.props.group);
                        }}
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
        const { navigate } = this.props.navigation;      
        return (
            <View>
                <Button 
                    title="Create an Outing"
                    onPress={() => {
                        navigate("create");
                    }}
                />
                <SwipeListView 
                    dataSource={this.ds.cloneWithRows(this.state.outings)}
                    renderRow={(group, secId, rowId, rowMap) => 
                        <Group 
                            group={group} 
                            navigation={this.props.navigation} 
                            remove={(group) => {
                                this.deleteRow(secId, rowId, rowMap);
                            }}
                            add={ async (group) => {
                                this.accept(secId, rowId, rowMap, group);
                            }}
                        /> }
                    leftOpenValue={25}
                    rightOpenValue={-100}
                    renderHiddenRow={ (data, secId, rowId, rowMap) => (
							<View style={styles.rowBack}>
								<TouchableOpacity style={[styles.backRightBtnLeft, styles.backRightBtn]} onPress={ _ => this.accept(secId, rowId, rowMap, data) }>
									<Text style={styles.backTextWhite}>Let's Go!</Text>
                                </TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
									<Text style={styles.backTextWhite}>No Thanks.</Text>
								</TouchableOpacity>
							</View>
						)}
                />
            </View>
        )
    }

    accept = async (secId, rowId, rowMap, group) => {
        let user = new User(this.props.user);
        await group.addUser(user);
        this.deleteRow(secId, rowId, rowMap);
    }

    render() {
        return (
            <View>
                {this.state.outings.length > 0 ? this._renderAll() : this._renderNone()}
            </View>
        )
    }

    deleteRow = (secId, rowId, rowMap) => {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.outings];
		newData.splice(rowId, 1);
		this.setState({outings: newData});
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupView);

const styles = {
    row: {
        backgroundColor: "white"
    },
    rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
        width: "50%",
        height: "100%"        
	},
	backRightBtnLeft: {
		backgroundColor: '#bada55',
        width: "50%",
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
}