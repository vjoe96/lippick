import { combineReducers } from "redux";
import user from "./user_reducers";
import {
    setBagCount,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
    reducer11,
    reducer12,
    reducer13,
    reducer14,
    reducer15
} from "./store";

const rootReducer = combineReducers({
    user,
    setBagCount,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
    reducer11,
    reducer12,
    reducer13,
    reducer14,
    reducer15
});

export default rootReducer;
