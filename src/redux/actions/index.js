
import { logoutUser, updatingUser, clearError, handlingLoginSubmit, addingUser, fetchingUser, clearLoading } from './users'
import { addingContact, deletingContact, updatingContact, updateSearchTerm } from './contacts'
import { addingEvent, updatingEvent, deletingEvent} from './events'
import { addingReminder, notifyReminders, updatingReminder, deletingReminder, filterCalendar, setFeaturedReminder } from './reminders'
import {addGift, addingGiftContact} from './gifts'

export {

  fetchingUser,
  updateSearchTerm,
  addingEvent,
  addingContact,
  updatingEvent,
  deletingEvent,
  deletingContact,
  updatingUser,
  updatingContact,
  handlingLoginSubmit,
  clearError,
  logoutUser,
  addingUser,
  clearLoading,
  addGift,
  addingGiftContact,
  addingReminder, 
  notifyReminders, 
  updatingReminder, 
  deletingReminder, 
  filterCalendar, 
  setFeaturedReminder 
}