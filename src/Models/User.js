import { Model, API, Converters } from "../API";
import { Alert } from 'react-native';

export default class User extends Model {
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
				return new this(json.data)
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
			var res = await API.rawPost("/auth/sign_in", obj);
			var json = await res.json();
			if(json["status"] == "success") {
				Alert.alert("Successful Login!");
				API.addHeader("access_token", res.headers["access_token"]);
				API.addHeader("client", res.headers["client"]);
				API.addHeader("uid", res.headers["uid"]);
				return new this(json.data)
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

	addTeam(team){
		this.api.post(`/teams/${team.id}/users`, this._serialize())
	}

}