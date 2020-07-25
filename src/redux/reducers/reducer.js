import { combineReducers } from "redux";
import { userReducer, loadingReducer} from './users';
import { eventsReducer, setCurrentEventReducer } from './events';
import { contactsReducer, searchTermReducer } from './contacts';
import {giftsReducer} from './gifts';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  contacts: contactsReducer,
  events: eventsReducer,
  gifts: giftsReducer,
  searchTerm: searchTermReducer,
  currentEvent: setCurrentEventReducer
});

export default rootReducer;
