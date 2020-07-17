

const userReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCHED_USER':
        return action.payload.user
      case "UPDATING_USER":
        return action.user.user
      case "LOGOUT_USER":
        return {}
      default:
        return state
    }
  }


  
  
export { userReducer}