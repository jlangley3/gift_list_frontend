const giftsReducer = (state = [], action) => {
    switch (action.type) {
      case '"FETCHED_USER"':
        return action.payload.user.gifts
        case "ADD_GIFT":
          return [...state, action.gift]
        case "UPDATE_GIFT":
          return state.map(gift => gift.id === action.gift.id ? action.gift : gift)
        case "DELETE_GIFT":
          return state.filter(gift => gift.id !== action.gift.id)
        case "LOGOUT_USER":
          return []
        default:
          return state
      }
    }


  
  
export { giftsReducer}