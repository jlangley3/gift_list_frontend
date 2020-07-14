// action creators
// const URL = "http://localhost:3000/paintings"


// function changeSearchText(value) {
//   return { type: "CHANGE_SEARCH_TEXT", payload: value };
// }

// function vote(paintingId) {
//   return { type: "INCREASE_VOTES", payload: paintingId };
// }

// function updatingPainting(info) {
//   return (dispatch, getState) => {
//     //getState().searchText => would give you your searchText state
//   fetch(URL + "/" + info.paintingId, {
//     method: "PATCH",
//     headers: {"Content-Type": "application/json", "Accepts": "application/json"},
//     body: JSON.stringify({
//       title: info.title,
//       artist: {
//         name: info.name,
//         birthday: info.birthday,
//         deathday: info.deathday     
//       }
//      })
//     }).then(res => res.json())
//    .then(p => {
//     //store.dispatch()
//     dispatch(updatedPainting(info))
//     })
//   }
//   }


// //this updated on front end
// function updatedPainting({ title, name, birthday, deathday, paintingId }) {
//   return {
//     type: "UPDATE_PAINTING",
//     payload: { title, name, birthday, deathday, paintingId}
//   };
// }

// function fetchedPaintings(paintings) {
//   return {type: 'FETCHED_PAINTINGS', payload: paintings};
// }

// function fetchingPaintings() {
//     return (dispatch) => {
//     fetch(URL)
//     .then(res => res.json())
//     .then(paintings => {
//       //store.dispatch()
//       dispatch(fetchedPaintings(paintings))
//     })
//   }  
// }

// export { changeSearchText, vote, updatedPainting, updatingPainting, fetchingPaintings};
