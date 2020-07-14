

//Initial User Fetch, loading into state, and error handling
// const fetchedUser = payload => {
//   return { type: FETCHED_USER, payload }
// }

// const loadingUser = () => {
//   return { type: LOADING_USER }
// }

// const clearLoading = () => {
//   return { type: CLEAR_LOADING }
// }

// const displayError = (errors) => {
//   return { type: THROW_ERROR, errors }
// }

// const fetchingUser = token => {
//   return (dispatch) => {
//     dispatch(loadingUser)

//     fetch(`${URL()}/profile`, {
//       headers: authHeaders()
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.user.id !== undefined) {
//           console.log(data.user)
//           dispatch(fetchedUser(data))
//         } else {
//           dispatch(clearLoading())
//         }
//       })
//   }
// }

// const addingUser = user => {
//   return (dispatch) => {
//     dispatch(loadingUser)

//     fetch(`${URL()}/users`, {
//       method: 'POST',
//       // headers: {'Content-Type': 'application/json'},
//       body: user
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         if (data.authenticated) {
//           dispatch(fetchedUser(data))
//           localStorage.setItem('token', data.token)
//         } else {
//           console.log(data.message)
//           dispatch(displayError(data))
//           dispatch(clearLoading())
//         }
//       })
//   }
// }


// const authenticatingUser = params => {
//   return (dispatch) => {
//     dispatch(loadingUser)

//     fetch(`${URL()}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(params)
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         if (data.authenticated) {
//           dispatch(fetchedUser(data))
//           localStorage.setItem('token', data.token)
//         } else {
//           console.log(data)
//           dispatch(displayError(data.message))
//           dispatch(clearLoading())
//         }
//       })
//       .catch((error) => {
//         dispatch(displayError(error))
//         throw error
//       })
//   }
// }

// const clearError = () => {
//   return { type: CLEAR_ERROR }
// }

// const updateUser = user => {
//   return { type: UPDATING_USER, user: user }
// }

// const updatingUser = (user, id) => {
//   return dispatch => {
//     fetch(`${URL()}/users/${id}`, {
//       method: 'PATCH',
//       headers: authHeaders(),
//       body: user
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         dispatch(updateUser(data))
//       })
//   }
// }

// const logoutUser = () => {
//   return { type: LOGOUT_USER }
// }

// export { logoutUser, updatingUser, clearError, authenticatingUser, addingUser, fetchingUser, clearLoading }