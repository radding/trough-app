import { APIRequests, API } from "./API.js";
import { Model } from "./Model.js";
import {
    TimeStamp,
    Nullable,
    ArrayOf
} from "./Converters.js"

import {LANGS, PROMINENCE, DISTANCE, PlacesApi} from "./PlacesAPI.js";

Converters = {
    TimeStamp: TimeStamp,
    Nullable: Nullable,
    ArrayOf: ArrayOf
}

export {APIRequests, API, Model, Converters, LANGS, PROMINENCE, DISTANCE, PlacesApi};