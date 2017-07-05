import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowPlaces: false
        }
        this.showPlaces = this.showPlaces.bind(this);
        this.showTextBox = this.showTextBox.bind(this);
    }

    showTextBox() {
        return (
            <TextInput
                value={this.state.address}
                onFocus={() => this.setState(
                    {shouldShowPlaces: true}
                )}
                placeholder="Where do you want to go?"
            />
        );
    }

    showPlaces() {
        return (
            <GooglePlacesAutocomplete

            />
        );

    }

    render () {
        return (
            <View>
               {this.state.shouldShowPlaces ? this.showPlaces() : this.showTextBox() } 
            </View>
        )
    }
}
