import { Model, API } from "../API";

import {
     Alert
} from 'react-native';


export default class Team extends Model {
    constructor(obj) {
        super(obj);
    }
    
    get jsonFields() {
        return Object.assign(super.jsonFields, {
            name: String
        });
    }

    static async Match(name) {

        var result = await API.get(`/teams?s=${name}`);
        result = result.map((res) => {
            if (res.name.toLowerCase() === name.toLowerCase()) {
                return res;
            }
        });
        // Alert.alert(result.length);
        return result.length < 1 ? this.Create({name: name}) : new this(result[0]);
    }
}