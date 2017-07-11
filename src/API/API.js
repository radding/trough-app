import {AsyncStorage} from "react-native";

class APIRequests {
    constructor(url) {
        this.url = url
        this.headers = {
            'Content-Type': 'application/json'
        };
        this.addHeader("Content-Type", 'application/json');
        this.addHeader = this.addHeader.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.getAsync = this.getAsync.bind(this);
        this.put = this.put.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.delete = this.delete.bind(this); 
        this.rawPost = this.rawPost.bind(this);
        this.buildUrl = this.buildUrl.bind(this);
        this.encodeObject = this.encodeObject.bind(this);
    }

    addHeader(name, value) {
        this.headers[name] = value;
    }

    buildUrl(url) {
        return `https://${this.url}${url}`;
    }

    encodeObject(obj) {
        var encoded = Object.keys(obj).map((key) => {
            let encoded_key = encodeURIComponent(key);
            let encoded_value = encodeURIComponent(obj[key]);
            return `${encoded_key}=${encoded_value}`;
        });
        return encoded.join("&");
    }

    async sendRequest(url, method, body) {
        var url = this.buildUrl(url);       
        if (method.toLowerCase() == "get") {
            var params = this.encodeObject(body || {});
            if (params) {
                url = `${url}?${params}`;
            }
            return fetch(url, {
                headers: this.headers
            });
        }
        return fetch(url, {
            method: method,
            headers: this.headers,
            body: JSON.stringify(body)
        });
    }
    
    async get(url, params={}) {      
        var response = await this.sendRequest(url, "GET", params);
        var json = await response.json();
        return json;
    }

    getAsync(url, params={}) {
        return this.sendRequest(url, "GET", params).then((result) => result.json());
    }

    rawPost(url, body) {
        return this.sendRequest(url, "POST", body);
    }

    post(url, body) {
        return this.sendRequest(url, "POST", body).then((result) => {
            return result.json();
        });
    }

    put(url, body) {
        return this.sendRequest(url, "PUT", body).then((result) => result.json());
    }

    delete(url, body) {
        return this.sendRequest(url, "DELETE", body).then((result) => result.json());
    }
}

const url = "trough-api.herokuapp.com";
const API = new APIRequests(url);

export { APIRequests, API }