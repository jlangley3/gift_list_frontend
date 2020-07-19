

const eventsReducer = (state = {}, action) => {
    switch (action.type) {
      case '"FETCHED_USER"':
        return action.payload.user.events
        case "ADD_EVENT":
          return [...state, action.event]
        case "UPDATE_EVENT":
          return state.map(event => event.id === action.event.id ? action.event : event)
        case "DELETE_EVENT":
          debugger;
          return state.filter(event => event.id !== action.event.id)
        case "LOGOUT_USER":
          return []
        default:
          return state
      }
    }


  
  
export { eventsReducer}