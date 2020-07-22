const URL = () => {
  return `http://localhost:3000/api/v1`
}

const authHeaders = () => {
  const token = localStorage.getItem('token')
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const handledLoginSubmit = (user_data) => {
  return { type: "FETCHED_USER", payload: user_data}
}

export const loadingUser = () => {
  return { type: "LOADING_USER" }
}

export const clearLoading = () => {
  return { type: "CLEAR_LOADING" }
}


export const handlingLoginSubmit = (user_auth) => {
  console.log(user_auth)
  return (dispatch) => {
    dispatch(loadingUser)

  fetch(`${URL()}/login`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      user: user_auth
    })
  }).then(res => res.json())
  .then(auth_data => {
    console.log(auth_data)
    if (auth_data.authenticated) {
      dispatch(handledLoginSubmit(auth_data))
      localStorage.setItem('token', auth_data.token)
    } else {
      console.log(auth_data)
      dispatch(clearLoading())
    }
  })
  .catch((error) => {
    alert(error.message)
  })
}
}


export const fetchingUser = (token) => {
  return (dispatch) => {
    dispatch(loadingUser)
          
    fetch(`${URL()}/profile`, {
      method: "GET",
      headers: {
        "Authentication": localStorage.getItem("token")
      }
    })
      .then(resp => resp.json())
      .then(user_data => {
        if (user_data.user.id !== undefined) {
          console.log(user_data.user)
          dispatch(handledLoginSubmit(user_data))
        } else {
          dispatch(clearLoading())
        }
      })
  }
}

export const addingUser = user => {
  return (dispatch) => {
    dispatch(loadingUser)

    fetch(`${URL()}/users`, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        user: user
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.authenticated) {
          dispatch(handledLoginSubmit(data))
          localStorage.setItem('token', data.token)
        } else {
          console.log(data.message)
          dispatch(clearLoading())
        }
      })
  }
}


export const updateUser = (user) => {
  return { type: "UPDATING_USER", user: user }
}

export const updatingUser = (user, id) => {
  return dispatch => {
    fetch(`${URL()}/users/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: user
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(updateUser(data))
      })
  }
}




export const logoutUser = () => {
  return { type: "LOGOUT_USER" }
}
