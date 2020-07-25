const URL = () => {
    return `http://localhost:3000/api/v1`
  }
  
  const authHeaders = () => {
    return {
      'Content-Type': 'application/json',
      "Authentication": localStorage.getItem("token")
    }
  }

  const addContact = newContact => {
    return { type: "ADD_CONTACT", contact: newContact }
  }
  
  const addingContact = contact_data => {
    return (dispatch) => {
      fetch(`${URL()}/contacts`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(contact_data.contact)
      })
        .then(res => res.json())
        .then(newContact => dispatch(addContact(newContact)))
    }
  }
  
  const updateContact = contact => {
    return { type: "UPDATE_CONTACT", contact: contact }
  }
  
  const updatingContact = (id, contact) => {
    return (dispatch) => {
      fetch(`${URL()}/contacts/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(contact)
      })
        .then(resp => resp.json())
        .then(updatedContact => dispatch(updateContact(updatedContact)))
    }
  }
  
  const deleteContact = contact => {
    return { type: "DELETE_CONTACT", contact: contact }
  }
  
  const deletingContact = contact => {
    return dispatch => {
      fetch(`${URL()}/contacts/${contact.id}`, {
        method: 'DELETE',
        headers: authHeaders()
      })
        .then(res => res.json())
        .then(oldContact => {
          console.log(oldContact)
          dispatch(deleteContact(oldContact))
        })
    }
  }
  
  
  const updateSearchTerm = searchTerm => {
    return { type: "UPDATE_SEARCH_TERM", searchTerm }
  }
  
  
  export { addingContact, deletingContact, updatingContact, updateSearchTerm}