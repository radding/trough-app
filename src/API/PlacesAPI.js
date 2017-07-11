import {APIRequests} from "./API.js";

const PROMINENCE = "prominence";
const DISTANCE = "distance";

const LANGS = {
    english: "en",
}

class PlacesApi extends APIRequests {
    constructor(key, params={}) {
        super("maps.googleapis.com/maps/api/place/nearbysearch/");
        this.params = {key: key, radius: 500, ...params};
        this.search = this.search.bind(this);
        this._newPlacesApi = this._addParam.bind(this);
        this.near = this.near.bind(this);
        this.map = this.map.bind(this);
        this.ofType = this.ofType.bind(this);
    }

    _addParam(obj) {
        this.params = {
            ...this.params,
            ...obj
        };
        return this;
    }

    ofType(type) {
        return this._addParam({type: type});
    }

    search(term) {
        return this._addParam({keyword: term})
    }

    near(lat, long) {
        return this._addParam({location: `${lat},${long}`});
    }

    rankby(ranking) {
        return this._addParam({rankby: ranking});
    }

    in(lang) {
        return this._addParam({language: lang});
    }
    
    within(radius) {
        return this._addParam({radius: radius});
    }

    async map(cb) {
        var objs = await this.get("json", this.params);
        if (objs.error_message) {
            throw objs.error_message;
        }
        return objs.results.map(cb);
    }

    resolve() {
        return this.getAsync("json", this.params);
    }
} 

export {LANGS, PROMINENCE, DISTANCE, PlacesApi};