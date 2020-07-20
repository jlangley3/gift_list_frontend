import { combineReducers } from "redux";
import { userReducer, loadingReducer} from './users';
import { eventsReducer } from './events';
import { contactsReducer, searchTermReducer } from './contacts';
import {giftsReducer} from './gifts';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  searchTerm: searchTermReducer,
  contacts: contactsReducer,
  events: eventsReducer,
  gifts: giftsReducer,

});

export default rootReducer;
