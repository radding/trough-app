import { Model } from "../API";


export default class Team extends Model {
    constructor(obj) {
        super(obj);
    }
    
    get jsonFields() {
        return Object.assign(super.jsonFields, {
            name: String
        });
    }
}