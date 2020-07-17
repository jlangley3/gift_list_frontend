

const userReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FETCHED_USER':
        return action.payload.user
      case "UPDATING_USER":
        return action.user.user
      case "LOGOUT_USER":
         localStorage.clear();
        return {}
      default:
        return state
    }
  }

  const loadingReducer = (state = true, action) => {
    switch (action.type) {
      case "LOADING_USER":
        return true
      case "FETCHED_USER":
        return false
      case "CLEAR_LOADING":
        return false
      default:
        return state
    }
  }


  
  
export { userReducer, loadingReducer}