import moment from "moment";

function TimeStamp(time) {
    var value = moment(time);
    return value.isValid() ? value : null;
}

function ArrayOf(Mapper) {
    return (arr) => {
        return arr.map((object) => {
            return Mapper(object);
        });
    }
}


export {
    TimeStamp
}