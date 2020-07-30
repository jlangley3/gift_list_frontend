const URL = () => {
  return `http://localhost:3000/api/v1`
}

const authHeaders = () => {
  return {
    'Content-Type': 'application/json',
    "Authentication": localStorage.getItem("token")
  }
}
  
export const addingEvent = (newEventData) => {
  return (dispatch) => {
    
    fetch(`${URL()}/events`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(newEventData)
    })
    .then(resp => resp.json())
    .then(newEvent => {
      dispatch(addEvent(newEvent))
      })
      
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
      dispatch(removeCurrentEvent(eventData))
    })
  }
}

export const deleteEvent = newEvent => {
  return {type: "DELETE_EVENT", event: newEvent}
}

export const removeCurrentEvent = newEvent => {
  return {type: "REMOVE_CURRENT_EVENT", event: newEvent}
}






export const addingEventContact = (newData, thisEvent) => {
  return (dispatch) => {
    fetch(`${URL()}/gifts`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({
        name: newData.name,
        event_id: thisEvent.id,
        contact_id: newData.contact.id,
        price: 0
        
      })
    })
    .then(resp => resp.json())
    .then(newGift => {
      dispatch(addEventContact(newData.contact));
      dispatch(addGiftToEvent(newGift));
      dispatch(addContactToEvent(thisEvent, newData.contact))
      // dispatch(editCurrentEvent({...thisEvent,
      // gifts: {...gifts, newGift},
      // contacts: {...contacts, newContactData}
      // }))
    })
  }
}
export const addContactToEvent = (event, contact) => {
  return { type: "ADD_CONTACT_TO_EVENT", payload: {contact: contact, event: event}}
}

export const addEventContact = (contact) => {
  return { type: "ADD_CONTACT_TO_CURRENT_EVENT", contact: contact}
}
export const addGiftToEvent = (gift) => {
  return { type: "ADD_GIFT_TO_CURRENT_EVENT", gift: gift}
}
export const setCurrentEvent = (e) => {
  return { type: "CURRENT_EVENT", payload: e}
}
export const editCurrentEvent = (e) => {
  return { type: "EDIT_CURRENT_EVENT", payload: e}
}
