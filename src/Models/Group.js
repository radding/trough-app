import { Model, API } from "../API";

import {
     Alert
} from 'react-native';


export default class Group extends Model {
    constructor(obj) {
        super(obj);
    }
    
    get jsonFields() {
        return Object.assign(super.jsonFields, {
            name: String
        });
    }

    static async Match(name) {
        var result = await API.get(`/group?s=${name}`);
        result = result.map((res) => {
            if (res.name.toLowerCase() === name.toLowerCase()) {
                return res;
            }
        });
<<<<<<< HEAD
        
=======
        // Alert.alert(result.length);
>>>>>>> 052fb42b6f87b5a4e9419282b88d310e57c6c044
        return result.length < 1 ? this.Create({name: name}) : new this(result[0]);
    }
}