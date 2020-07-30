const URL = () => {
    return `http://localhost:3000/api/v1`
  }
  
  const authHeaders = () => {
    return {
      'Content-Type': 'application/json',
      "Authentication": localStorage.getItem("token")
    }
  }
    
  export const addingInterests = (interest, contact) => {
    return (dispatch) => {
      fetch(`${URL()}/interests`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          name: interest,
          contact_id: contact.id
          
        })
      })
      .then(resp => resp.json())
      .then(newInterest => {
        console.log(newInterest)
        // dispatch(addInterest(newInterest));
      })
    }
  }
  
  export const addInterests = (interest, contact) => {
    return {type: "UPDATE_CONTACT", contact: {...contact, interests: [...contact.interests, interest]}}
  }



  export const updatingInterest = (newInterest) => {
    return (dispatch) => {
      fetch(`${URL()}/Interests/${newInterest.id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
          Interest: newInterest
        })})
      .then(resp => resp.json())
      .then(newInterest => {
        console.log(newInterest)
        dispatch(updateInterest(newInterest))
        dispatch(updatingEventInterest(newInterest))
      })
    }
  }

  export const deletingInterest = (Interest, thisEvent) => {
    return (dispatch) => {
      fetch(`${URL()}/Interests/${Interest.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
        body: JSON.stringify(Interest)
      })
      .then(resp => resp.json())
      .then(InterestData => {
        console.log(InterestData)
        dispatch(deletedInterest(InterestData))
        dispatch(deletedEventInterest(InterestData))
      })
    }
  }
  
  export const deletedEventInterest = Interest => {
    return {type: "DELETE_Interest_FROM_EVENT", Interest: Interest}
  }
  export const deletedInterest = Interest => {
    return {type: "DELETE_Interest", Interest: Interest}
  }
  
  export const updateInterest = Interest => {
    return {type: "UPDATE_Interest", Interest: Interest}
  }

  export const updatingEventInterest = Interest => {
    return {type: "UPDATE_Interest_IN_EVENT", Interest: Interest}
  }
  
