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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowPlaces: false,
            region: {
                latitude: 42.3314,
                longitude: -83.0458,
                latitudeDelta: .05,
                longitudeDelta: .05
            }
        }
        this.showPlaces = this.showPlaces.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    coords: {
                        latitude:  position.coords.latitude,
                        longitude: position.coords.longitude,
                    },
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: .05,
                        longitudeDelta: .05
                    }
                });
            }
        )
    }

    onRegionChange(region) {
        this.setState({
            region: region
        });
    }

    showPlaces() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Where do you want to go?'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed={true}    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data);
                    console.log(details);
                }}
                getDefaultValue={() => {
                    return ''; // text input default value
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyCx8HlkrfsOGSU36_ptv0m73TB0xucjw34',
                    language: 'en', // language of the results
                    types: '(cities)', // default: 'geocode'
                }}
                styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food',
                }}


                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        );

    }

    render () {
        return (
            <View style={ styles.container }>
               {/*{ this.showPlaces() } */}
               <MapView
                    style={ styles.map }
                    provider={PROVIDER_GOOGLE}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
}
