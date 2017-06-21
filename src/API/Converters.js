import moment from "moment";

function TimeStamp(time) {
    var value = moment(time);
    return value.isValid() ? value : null;
}


export {
    TimeStamp
}