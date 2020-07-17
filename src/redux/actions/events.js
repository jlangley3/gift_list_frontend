const URL = () => {
    return `http://localhost:3000/api/v1`
  }
  
  export const fetchedEvents = (payload) => {
    return { type: "FETCHED_EVENTS", payload }
  }
  

  export const fetchingEvents = (user_data) => {
    console.log(user_data)
 
    fetch(`${URL()}/events`)
    .then(res => res.json())
    .then(data => {
      console.log("fetching events", data)
      if(data.error){
        console.log(data)
        alert(data.message)
      }else{
        dispatch(fetchedEvents(data))
      }
    })
  }
  