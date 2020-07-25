

const eventsReducer = (state = [], action) => {
    switch (action.type) {
      case "FETCHED_USER":
        return action.payload.user.events
        case "ADD_EVENT":
          return [...state, action.event]
        case "UPDATE_EVENT":
          debugger;
          return state.map(event => event.id === action.event.id ? action.event : event)
        case "DELETE_EVENT":
          return state.filter(event => event.id !== action.event.id)
        case "LOGOUT_USER":
          return []
        default:
          return state
      }
    }

    const setCurrentEventReducer = (state = {}, action) => {
      switch (action.type) {
        case "CURRENT_EVENT":
          return action.payload
        case "EDIT_CURRENT_EVENT":
        return action.payload
        case "ADD_GIFT_TO_CURRENT_EVENT":
          return {...state, gifts: [...state.gifts, action.gift]}
        case "UPDATE_GIFT_IN_EVENT":
          return {...state, gifts: state.gifts.map(gift => gift.id === action.gift.id ? action.gift : gift)}
          case "DELETE_GIFT_FROM_EVENT":
            return {...state, gifts: state.gifts.filter(gift => gift.id !== action.gift.id)}
        case "ADD_CONTACT_TO_CURRENT_EVENT":
          return {...state, contacts: [...state.contacts, action.contact]}
        case "REMOVE_CURRENT_EVENT":
          return {}
        case "LOGOUT_USER":
          return {}
          default:
            return state
        }
      }
  
  
export { eventsReducer, setCurrentEventReducer}