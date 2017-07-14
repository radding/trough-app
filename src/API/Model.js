import { API } from "./API.js";
import { TimeStamp } from "./Converters.js";
import moment from "moment";

class Model {

    constructor(jsonObj) {
        this.api = API;
        this.new = true;
        if (jsonObj) {
            this.new = false;
            this.fill(jsonObj);
        }
    }

    get myUrl() {
        return `/${this._getURL()}/${id}`
    }

    get _modelName() {
        return this.constructor.name.toLowerCase()
    }

    get jsonFields() {
        return {
            id: Number,
            created_at: TimeStamp,
            updated_at: TimeStamp
        };
    }

    fill(jsonObj) {
        Object.keys(this.jsonFields).map((key) => {
            let converter = this.jsonFields[key];
            if (converter == Array || converter == Object) {
                converter = (obj) => {return obj};
            }
            else if(converter.prototype instanceof Model) {
                var converter2 = converter;
                converter = (obj) => {
                    return new converter2(obj);
                }
            }
            this[key] = converter(jsonObj[key]);
        });
    }

    _serialize() {
        var serializedObject = {}
        serializedObject[this._modelName] = {};

        Object.keys(this.jsonFields).map((value) => {
            let val =  this[value];
            if (val != null && val.__proto__ instanceof Model) {
                let _val = val._serialize();
                val = _val[val._modelName];
            }
            else if (val != null && moment.isMoment(val)) {
                val = String(val);
            }
            serializedObject[this._modelName][value] = val || null;
        });
        
        return serializedObject;
    }
    
    static _getURL() {
        var name = this.name.toLowerCase();
        return `/${name}s`;
    }

    static Get(id) {
        return this.constructor(API.get(url));
    }

    static async All(params={}) {
        var res = await API.get(this._getURL(), params);
        var arr = res.map((obj) => new this(obj));
        return arr;
    }

    save() {
        if (this.new) {
            return this.create();
        }
        this.new = false;
        return this.api.put(this.myUrl, this._serialize()) 
    }

    delete() {
        return this.api.delete(this.url);
    }

    async create() {
        this.new = false;
        let res = await this.api.post(this.constructor._getURL(), this._serialize());
        this.id = res.id;
        return res;
    }

    static async Create(obj, save=true) {
        var object = new this();
        object.fill(obj);
        if (save)
            await object.save();
        return object;
    }
    
}

export { Model };
