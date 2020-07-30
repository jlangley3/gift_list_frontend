

const eventsReducer = (state = [], action) => {
  let thisEvent;
  let newEvent;
    switch (action.type) {
      case "FETCHED_USER":
        return action.payload.user.events
        case "ADD_EVENT":
          return [...state, action.event]
        case "UPDATE_EVENT":
          return state.map(event => event.id === action.event.id ? action.event : event)
        case "DELETE_EVENT":
          return state.filter(event => event.id !== action.event.id)
        case "EDIT_CURRENT_EVENT":
            thisEvent = action.payload
            return state.map(event => event.id === thisEvent.id ? thisEvent : event)
        case "ADD_GIFT_TO_CURRENT_EVENT":
                thisEvent = state.find(event => event.id === action.gift.event_id)
                newEvent = {...thisEvent, gifts: [...thisEvent.gifts, action.gift]}
            return state.map(event => event.id === newEvent.id ? newEvent : event)
        case "UPDATE_GIFT_IN_EVENT":
            thisEvent = state.find(event => event.id === action.gift.event_id)
            newEvent = {...thisEvent, gifts: thisEvent.gifts.map(gift => gift.id === action.gift.id ? action.gift : gift)}
            return state.map(event => event.id === newEvent.id ? newEvent : event)
        case "DELETE_GIFT_FROM_EVENT":
              thisEvent = state.find(event => event.id === action.gift.event_id)
              newEvent = {...thisEvent, gifts: thisEvent.gifts.filter(gift => gift.id != action.gift.id)}
              return state.map(event => event.id === newEvent.id ? newEvent : event)
        case "ADD_CONTACT_TO_EVENT":
         thisEvent = state.find(event => event.id === action.payload.event.id)
          newEvent = {...thisEvent, contacts: [...thisEvent.contacts, action.payload.contact]}
          return state.map(event => event.id === newEvent.id ? newEvent : event)
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