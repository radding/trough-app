import { Model, API } from "../API";
import { Alert } from 'react-native';

export default class User extends Model {
	static async Create(obj) {
		try { 
			var res = await API.rawPost("/auth/", obj);
			var json = await res.json();
			if(json["status"] == "success") {
				Alert.alert("Successful registration!");
				API.addHeader("access_token", res.headers["access_token"]);
				API.addHeader("client", res.headers["client"]);
				API.addHeader("uid", res.headers["uid"]);
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

}