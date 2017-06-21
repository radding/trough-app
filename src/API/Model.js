import { API } from "./API.js";
import { TimeStamp } from "./Converters.js";

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
                converter = (obj) => {
                    return new converter(obj);
                }
            }
            this[key] = converter(jsonObj[key]);
        });
    }

    _serialize() {
        var serializedObject = {[this._modelName]: {}};

        Object.keys(this.jsonFields).map((value) => {
            serializedObject[this._modelName][value] = this[value] || null;
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

    static async All() {
        var res = await API.get(this._getURL());
        // res.map((obj) => {
        //     throw this.constructor(obj);            
        // })
        var arr = res.map((obj) => new this(obj));
        return arr;
    }

    save() {
        if (this.new) {
            return this.create();
        }
        return this.api.put(this.myUrl, this._serialize()) 
    }

    delete() {
        return this.api.delete(this.url);
    }

    create() {
        return this.api.post(this.myUrl, this._serialize());
    }

    static Create(obj) {
        var object = new this();
        object.fill(obj);
        object.save();
        return object;
    }
    
}

// Model.All = Model.All.bind(Model);

export { Model };
