import { Model, API, Converters } from "../API";
import { Alert } from 'react-native';

import globals from "../globals.js";

export default class User extends Model {
	constructor(obj) {
		super(obj);
		this._isLoggedIn = false;
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
        image: Converters.Nullable(String)
      });
 	 }

	static async Create(obj) {
		try { 
			var res = await API.rawPost("/auth/", obj);
			var json = await res.json();
			if(json["status"] == "success") {
				Alert.alert("Successful registration!");
				API.addHeader("access_token", res.headers["access_token"]);
				API.addHeader("client", res.headers["client"]);
				API.addHeader("uid", res.headers["uid"]);
				globals.user = new this(json.data);
				globals.user.isLoggedIn = true;
				return globals.user;
			}
			else
				//json["errors"]["full_messages"].map((object)=>{Alert.alert(object)})
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
				console.warn("Successful Login!");
				API.addHeader("access_token", res.headers["access_token"]);
				API.addHeader("client", res.headers["client"]);
				API.addHeader("uid", res.headers["uid"]);
				globals.user = new this(json.data);
				globals.user.isLoggedIn = true;
				return globals.user;
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

	addTeam(team){
		this.api.post(`/teams/${team.id}/users`, this._serialize())
	}

}