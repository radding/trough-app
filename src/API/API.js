class APIRequests {
    constructor(url) {
        this.url = url
        this.headers = {};
        this.addHeader = this.addHeader.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.getAsync = this.getAsync.bind(this);
        this.put = this.put.bind(this);
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.delete = this.delete.bind(this); 
    }

    addHeader(name, value) {
        this.headers[name] = value;
    }

    sendRequest(url, method, body) {
        if (method.toLowerCase() == "get") {
            return fetch(`https://${this.url}${url}`, {
                headers: this.headers
            });
        }
        return fetch(`https://${this.url}${url}`, {
            method: method,
            headers: this.headers,
            body: JSON.stringify(body)
        });
    }
    
    async get(url) {      
        var response = await this.sendRequest(url, "GET", {});
        var json = await response.json();
        return json;
    }

    getAsync(url) {
        return this.sendRequest(url, "GET", {}).then((result) => result.json());
    }

    post(url, body) {
        return this.sendRequest(url, "POST", body).then((result) => result.json());
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