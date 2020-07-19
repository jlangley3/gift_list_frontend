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

  const addContact = newContactObj => {
    return { type: "ADD_CONTACT", contact: newContactObj }
  }
  
  const addingContact = contact => {
    return (dispatch) => {
      fetch(`${URL()}/contacts`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(contact)
      })
        .then(res => res.json())
        .then(newContactObj => dispatch(addContact(newContactObj)))
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
        .then(contactObj => {
          console.log(contactObj)
          dispatch(deleteContact(contactObj))
        })
    }
  }
  
  
  const updateSearchTerm = searchTerm => {
    return { type: "UPDATE_SEARCH_TERM", searchTerm }
  }

  export {
    addingContact,
    deletingContact,
    updatingContact,
    updateSearchTerm,
    updateContact
  }