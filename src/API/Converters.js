import moment from "moment";

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
        return arr.map((object) => {
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
    Nullable
}