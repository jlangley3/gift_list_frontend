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
  
export const addingEvent = newEventData => {
  return (dispatch) => {
    
    fetch(`${URL()}/events`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(newEventData)
    })
    .then(resp => resp.json())
    .then(newEvent => dispatch(addEvent(newEvent)))
  }
}

export const addEvent = newEvent => {
  return {type: "ADD_EVENT", event: newEvent}
}


export const updatingEvent = event => {
  return (dispatch) => {
    fetch(`${URL()}/events/${event.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(event)
    })
    .then(resp => resp.json())
    .then(eventData => {
      console.log(eventData)
      dispatch(updateEvent(eventData))
    })
  }
}


export const updateEvent = newEvent => {
  return {type: "UPDATE_EVENT", event: newEvent}
}

export const deletingEvent = thisEvent => {
  
  return (dispatch) => {
    fetch(`${URL()}/events/${thisEvent.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
      body: JSON.stringify(thisEvent)
    })
    .then(resp => resp.json())
    .then(eventData => {
      console.log(eventData)
      dispatch(deleteEvent(eventData))
    })
  }
}

export const deleteEvent = newEvent => {
  return {type: "DELETE_EVENT", event: newEvent}
}