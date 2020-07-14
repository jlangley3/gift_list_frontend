import { combineReducers } from "redux";


const searchTextReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_SEARCH_TEXT":
      return action.payload;
    default:
      return state;
  }
};

const paintingsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCHED_PAINTINGS":
      return action.payload
    case "INCREASE_VOTES":
      return state.map(painting => {
        if (painting.id === action.payload) {
          return {
            ...painting,
            votes: painting.votes + 1
          };
        } else {
          return painting;
        }
      });
    case "UPDATE_PAINTING":
      return state.map(painting => {
        if (painting.id === action.payload.paintingId) {
          return {
            ...painting,
            title: action.payload.title,
            artist: {
              ...painting.artist,
              name: action.payload.name,
              birthday: action.payload.birthday,
              deathday: action.payload.deathday
            }
          };
        } else {
          return painting;
        }
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchText: searchTextReducer,
  paintings: paintingsReducer
});

export default rootReducer;
