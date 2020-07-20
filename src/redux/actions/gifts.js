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
    
  export const addingGiftContact = (newContactData, thisEvent) => {
    return (dispatch) => {
      fetch(`${URL()}/gifts`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          name: "No Gift Yet",
          event_id: thisEvent.id,
          contact_id: newContactData.id

        })
      })
      .then(resp => resp.json())
      .then(newGift => dispatch(addGift(newGift)))
    }
  }
  
  export const addGift = newGift => {
    return {type: "ADD_GIFT", gift: newGift}
  }

  export const addingGift = (newGift, thisEvent) => {
    debugger;
    return (dispatch) => {
      fetch(`${URL()}/gifts`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          name: newGift.currentGift,
          event_id: thisEvent.id,
          contact_id: newGift.currentContact.id

        })
      })
      .then(resp => resp.json())
      .then(newGift => dispatch(addGift(newGift)))
    }
  }
  
