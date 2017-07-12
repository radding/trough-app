import { Model, API, Converters } from "../API";
import { Alert } from 'react-native';
import Team from "./Team.js";

import globals from "../globals.js";

export default class User extends Model {
	constructor(obj) {
		super(obj);
		this._isLoggedIn = false;
		this.syncWithApi = this.syncWithApi.bind(this);
	}

	get isLoggedIn() {
		return this._isLoggedIn;
	}

	set isLoggedIn(value) {
		this._isLoggedIn = value;
	}

    get jsonFields() {
      return Object.assign(super.jsonFields, {
        email: String,
        provider: String,
        uid: String,
        name: Converters.Nullable(String),
        nickname: Converters.Nullable(String),
        image: Converters.Nullable(String),
		teams: Converters.ArrayOf(Team)
      });
 	 }

	static UserFromJson(res, data) {
		var user = new this(data);
		user.headers = {};
		user.headers.access_token = res.headers.map["access-token"];
		user.headers.client = res.headers.map.client;
		user.headers.uid = res.headers.map.uid;
		user.headers.isLoggedIn = true;
		return user;
	}

	static async Create(obj) {
		try {
			var res = await API.rawPost("/auth/", obj);
			var json = await res.json();
			if (json["status"] == "success") {
				return User.UserFromJson(res, json.data)
			}
			else
				throw {
					details: json["errors"],
					user_error: true
				};
		}
		catch (error) {
			throw error;
		}
	}

	static async Login(obj) {
		try {
			var res = await API.rawPost("/auth/sign_in/", obj);
			var json = await res.json();
			if(res.ok) {
				return User.UserFromJson(res, json.data);
			}
			else
				throw {
					details: json,
					user_error: true
				};
		}
		catch (error) {
			throw error;
		}
	}

	async syncWithApi() {
		var results = await this.makeRequest(this.api.get, '/users/me', {});
		this.fill(results);
	}

	async addTeam(team) {
		var res = await this.makeRequest(this.api.rawPost, `/teams/${team.id}/users`, this._serialize());
		var json = await res.json();
		if (!res.ok) {
			throw {status: res.status, errors: json, headers: this.api.headers}
		}
		return json;
	}

	async makeRequest(reqFunc, url, obj) {
		this.api.addHeader("access_token", this.headers.access_token);
		this.api.addHeader("client", this.headers.client);
		this.api.addHeader("uid", this.headers.uid);
		return reqFunc(url, obj);
	}

}