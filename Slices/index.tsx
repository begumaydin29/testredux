import { combineReducers } from "redux";
import postSaveNewRevision from "./NewRevision";
import {fetchData} from "./FleetType";
import {fetchRevisionDate} from "./RevisionDate";
import {fetchRevisionNo} from "./RevisionNo";


const allReducers = combineReducers({fetchData, postSaveNewRevision, fetchRevisionDate, fetchRevisionNo });

export default allReducers;
