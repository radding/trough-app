import { Model, API, PlacesApi } from "../API";

import {
     Alert
} from 'react-native';


export default class Place extends Model {
    constructor(obj) {
        super(obj);
        this.loadFromGoogle = this.loadFromGoogle.bind(this);
        this.data = null;
    }
    
    get jsonFields() {
        return Object.assign(super.jsonFields, {
            name: String,
            google_place: String,
            rating: String
        });
    }

    get address() {
        if (this.data === null) {
            return this.loadFromGoogle();
        }
        return this.data.vicinity;
    }

    async loadFromGoogle() {
        let places = new PlacesApi("AIzaSyCx8HlkrfsOGSU36_ptv0m73TB0xucjw34");
        this.data = places.with(this.google_place);
    }
}