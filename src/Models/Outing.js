import { Model, API, Converters} from "../API";

import {
     Alert
} from 'react-native';

import Place from "./Place.js";
import User from "./User.js";

export default class Outing extends Model {
    constructor(obj, headers={}) {
        super(obj);
    }
    
    get jsonFields() {
        return Object.assign(super.jsonFields, {
            name: String,
            place: Place,
            departure_time: Converters.TimeStamp,
            creator: User,
            team_id: Number
        });
    }

    get myUrl() {
        return `/teams/${this.team_id}/outings/${this.id}`
    }

     static _getURL() {
        return `/teams/1/outings/`;
    }
}