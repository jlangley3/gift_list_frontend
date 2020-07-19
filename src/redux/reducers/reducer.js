import { combineReducers } from "redux";
import { userReducer, loadingReducer} from './users';
import { eventsReducer } from './events';
import { contactsReducer, searchTermReducer } from './contacts';
import { remindersReducer, repeatingRemindersReducer, featuredReminderReducer } from './reminders';
import {giftsReducer} from './gifts';

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  searchTerm: searchTermReducer,
  contacts: contactsReducer,
  events: eventsReducer,
  gifts: giftsReducer,
  repeatingReminders: repeatingRemindersReducer,
  featuredReminder: featuredReminderReducer
});

export default rootReducer;
