const URL = () => {
    return `http://localhost:3000/api/v1`
  }
  
  const authHeaders = () => {
    const token = localStorage.getItem('token')
    
    return {
      'Content-Type': 'application/json',
      "Authentication": localStorage.getItem("token")
    }
  }

const addingReminder = newReminderData => {
  return (dispatch) => {
    
    fetch(`${URL()}/reminders`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(newReminderData)
    })
    .then(res => res.json())
    .then(newReminderObject => dispatch(addReminder(newReminderObject)))
  }
}

const notifyReminders = reminder => {
  return {type: "NOTIFY_REMINDERS", reminder}
}

const addReminder = newReminderObj => {
  return {type: "ADD_REMINDER", reminder: newReminderObj}
}

const updateReminder = reminderObj => {
  return {type: "UPDATE_REMINDER", reminder: reminderObj}
}

const updatingReminder = reminder => {
  return (dispatch) => {
    fetch(`${URL()}/reminders/${reminder.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(reminder)
    })
    .then(res => res.json())
    .then(reminderObj => {
      console.log(reminderObj)
      dispatch(updateReminder(reminderObj))
    })
  }
}

const deleteReminder = reminderObj => {
  return {type: "DELETE_REMINDER", reminder: reminderObj}
}

const deletingReminder = reminder => {
  return (dispatch) => {
    fetch(`${URL()}/reminders/${reminder.id}`, {
      method: "DELETE",
      headers: authHeaders()
    })
    .then(res => res.json())
    .then(reminderObj => {
      console.log(reminderObj)
      dispatch(deleteReminder(reminderObj))
    })
  }
}

const filterCalendar = term => {
  return { type: "SET_PRIORITY_FILTER", term }
}

const setFeaturedReminder = reminder => {
  return { type: 'SET_FEATURED_REMINDER', reminder }
}

export {
  addingReminder,
  notifyReminders,
  updatingReminder,
  deletingReminder,
  filterCalendar,
  setFeaturedReminder
}