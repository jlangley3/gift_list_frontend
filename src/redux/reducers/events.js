

const eventReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCHED_EVENT':
        return action.payload.event
      default:
        return state
    }
  }


  
  
export { userReducer}