// const userReducer = (state = {}, action) => {
//     switch (action.type) {
//       case FETCHED_USER:
//         return action.payload.user
//       case UPDATING_USER:
//         return action.user.user
//       case LOGOUT_USER:
//         return {}
//       default:
//         return state
//     }
//   }
  
//   const loadingReducer = (state = true, action) => {
//     switch (action.type) {
//       case LOADING_USER:
//         return true
//       case FETCHED_USER:
//         return false
//       case CLEAR_LOADING:
//         return false
//       default:
//         return state
//     }
//   }
  
//   const notificationReducer = (state = [], action) => {
//     switch (action.type) {
//       case THROW_ERROR:
//         console.log(action.errors)
//         return action.errors
//       case UPDATING_USER:
//         return { message: [action.user.message] }
//       case CLEAR_ERROR:
//         return []
//       default: return state
//     }
//   }
  
//   export { userReducer, loadingReducer, notificationReducer }