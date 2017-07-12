import moment from "moment";
import Model from "./Model.js";

/**
 * 
 * @param {string} time 
 * @return the moment object that represents the team, if invalid, returns null.
 */
function TimeStamp(time) {
    var value = moment(time);
    return value.isValid() ? value : null;
}

/**
 * 
 * @param {*} Mapper 
 * @return A function that takes an arr and performs Mapper on its elements
 */
function ArrayOf(Mapper) {
    return (arr) => {
        arr = arr || [];
        return arr.map((object) => {
            if (Mapper.prototype instanceof Model)
                return new Mapper(object);
            return Mapper(object);
        });
    }
}

function Nullable(converter) {
    return (object) => {
        return object ? converter(object) : null;
    } 
}

export {
    TimeStamp,
    Nullable,
    ArrayOf
}