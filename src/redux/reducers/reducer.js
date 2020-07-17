import { combineReducers } from "redux";
import { userReducer, loadingReducer} from './users'


const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer
});

export default rootReducer;
