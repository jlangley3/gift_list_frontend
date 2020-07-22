const URL = () => {
    return `http://localhost:3000/api/v1`
  }
  
  const authHeaders = () => {
    return {
      'Content-Type': 'application/json',
      "Authentication": localStorage.getItem("token")
    }
  }
    
  export const addingGift = (newContactData, thisEvent) => {
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



  export const updatingGift = (newGift) => {
    return (dispatch) => {
      fetch(`${URL()}/gifts/${newGift.id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify({
          gift: newGift
        })})
      .then(resp => resp.json())
      .then(newGift => {
        console.log(newGift)
        dispatch(updateGift(newGift))
        dispatch(updatingEventGift(newGift))
      })
    }
  }

  export const deletingGift = gift => {
    return (dispatch) => {
      fetch(`${URL()}/events/${gift.id}`, {
        method: 'DELETE',
        headers: authHeaders(),
        body: JSON.stringify(gift)
      })
      .then(resp => resp.json())
      .then(giftData => {
        console.log(giftData)
        dispatch(deletedGift(giftData))
        dispatch(deletedEventGift(giftData))
      })
    }
  }
  
  export const deletedEventGift = gift => {
    return {type: "DELETE_GIFT_FROM_EVENT", gift: gift}
  }
  export const deletedGift = gift => {
    return {type: "DELETE_GIFT", gift: gift}
  }
  
  export const updateGift = gift => {
    return {type: "UPDATE_GIFT", gift: gift}
  }

  export const updatingEventGift = gift => {
    return {type: "UPDATE_GIFT_IN_EVENT", gift: gift}
  }
  
