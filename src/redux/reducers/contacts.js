const contactsReducer = (state = [], action) => {

    switch (action.type) {
      case "FETCHED_USER":
        return action.payload.user.contacts
      case "ADD_CONTACT":
        return [...state, action.contact]
      case "UPDATE_CONTACT":
        debugger
        return state.map(c => c.id === action.contact.id ? action.contact : c)
      case "DELETE_CONTACT":
        return state.filter(c => c.id !== action.contact.id)
      case "LOGOUT_USER":
        return []
      default:
        return state
    }
  }
  
  const searchTermReducer = (state = '', action) => {
    switch (action.type) {
      case "UPDATE_SEARCH_TERM":
        return action.searchTerm
      case "LOGOUT_USER":
        return ''
      default:
        return state
    }
  }
  
  export { contactsReducer, searchTermReducer }

