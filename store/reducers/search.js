import { SEARCH_ARTICLES } from "../actions/search";
import { FETCH_SPECIFIC_ARTICLES } from "../actions/search";
  const initialState = {
    text: '',
    articles: [],
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_ARTICLES:
        return {
          ...state,
          text: action.payload,
        };
        case FETCH_SPECIFIC_ARTICLES:
        return {
          ...state,
          movies: action.payload,
        };
      default:
        return state;
    }
  }