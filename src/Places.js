import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FlipCard from 'react-native-flip-card';

import { PlacesApi } from "./API";

export default class Places extends Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            shouldShowPlaces: false,
            coords: {
                latitude:  42.3314,
                longitude: -83.0458,
            },
            region: {
                latitude: 42.3314,
                longitude: -83.0458,
                latitudeDelta: .005,
                longitudeDelta: .005
            },
            animating: false
        }
        this.showPlaces = this.showPlaces.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.regionFrom = this.regionFrom.bind(this);

        this.places = new PlacesApi('AIzaSyCx8HlkrfsOGSU36_ptv0m73TB0xucjw34');
    }

    regionFrom(lat, lon, accuracy) {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta)
        };
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
                        latitudeDelta: .005,
                        longitudeDelta: .005
                    }
                }, () => {
                    var region = this.regionFrom(this.state.coords.latitude, this.state.coords.longitude, 650);
                    this.setState({
                        region: region
                    })
                });
            }
        )
    }

    onRegionChange(region) {
        this.setState({
            region: region,
        });
    }

    render () {
        const complete = this.props.navigation.state.params.onComplete;
        return (
            <View>
                <View style={ styles.container }> 
                    <MapView
                        style={ styles.map }
                        provider={ PROVIDER_GOOGLE }
                        region={ this.state.region }
                        onRegionChange={ this.onRegionChange }
                    >
                        <MapView.Marker 
                            title="You"
                            pinColor="blue"
                            coordinate={{ latitude: this.state.coords.latitude, longitude: this.state.coords.longitude }}
                        />
                        
                        {this.state.places.map((place) => 
                            <MapView.Marker
                                title={place.name}
                                pinColor="red"
                                coordinate={{latitude: place.geometry.location.lat, longitude: place.geometry.location.lng}}
                                key={place.id}
                                onCalloutPress={() => {
                                    complete(place);
                                    this.props.navigation.goBack();
                                }}
                            />
                        )}

                    </MapView>
                </View>
                {this.showPlaces(complete)}
            </View>
        )
    }

    showPlaces(complete) {
        const place = this.props.navigation.state.params.place;        
        return (
            <GooglePlacesAutocomplete
                placeholder='Where do you want to go?'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed={true}    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                textInputProps={{
                    onChangeText: (text) => {
                        console.log("Works: " + text);
                        this.setState({
                            query: text
                        })
                    },
                    onSubmitEditing: async (text) => { 
                        this.setState( {animating: true} );
                        var results = this.places.ofType("restaurant").search(text.nativeEvent.text);
                        var loc = this.state.coords;
                        
                        var places = [];
                        await results.near(loc.latitude, loc.longitude).map((obj) => {
                            places.push(obj);
                        });

                        this.setState({
                            places: places
                        })
                        this.refs.place._disableRowLoaders();
                        this.refs.place._onBlur();
                    }
                }}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    complete(details);
                    this.props.navigation.goBack();                    
                }}
                getDefaultValue={() => {
                    return place.name || ''; // text input default value
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyCx8HlkrfsOGSU36_ptv0m73TB0xucjw34',
                    language: 'en', // language of the results
                }}
                styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    listView: {
                        position: 'absolute',
                        top: 44,
                        height: Dimensions.get('window').height - 88,
                        width: Dimensions.get('window').width
                    }
                }}
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
                ref="place"
            />
        );

    }
}

const styles = {
    flipcard: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 44
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 88
    }
}
