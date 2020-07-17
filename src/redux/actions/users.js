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

export const handleLoginSubmit = (payload) => {
  return { type: "FETCHED_USER", payload }
}

export const loadingUser = () => {
  return { type: "LOADING_USER" }
}



export const handlingLoginSubmit = (user_data) => {
  console.log(user_data)
  return (dispatch) => {
    dispatch(loadingUser)

  fetch(`${URL()}/login`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      user: user_data
    })
  }).then(res => res.json())
  .then(data => {
    console.log("server response", data)
    if(data.error){
      console.log(data)
      alert(data.message)
    }else{
      dispatch(handleLoginSubmit(data))
      localStorage.setItem('token', data.token)
      
    }
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
      .then(data => {
        if (data.user.id !== undefined) {
          console.log(data)
          dispatch(handleLoginSubmit(data))
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
