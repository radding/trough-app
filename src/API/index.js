import { APIRequests, API } from "./API.js";
import { Model } from "./Model.js";
import {
    TimeStamp,
    Nullable
} from "./Converters.js"

import {LANGS, PROMINENCE, DISTANCE, PlacesApi} from "./PlacesAPI.js";

Converters = {
    TimeStamp: TimeStamp,
    Nullable: Nullable
}

export {APIRequests, API, Model, Converters, LANGS, PROMINENCE, DISTANCE, PlacesApi};