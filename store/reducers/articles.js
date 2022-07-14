import { SET_ARTICLES } from "../actions/articles";
import { SEARCH_ARTICLES } from "../actions/articles";
import { FETCH_SPECIFIC_ARTICLES } from "../actions/articles";

const initialState = {
    searchedText: "",
    availableArticles: [],
    filteredArticles: [],
}
export default (state = initialState, action) => { 
    switch (action.type) {
        case SET_ARTICLES:
          return { 
            ...state, 
            availableArticles: action.articles, 
            filteredArticles: action.fetchedArticles
        };
        case SEARCH_ARTICLES:
        return {
          ...state,
          searchedText: action.payload,
        };
        case FETCH_SPECIFIC_ARTICLES:
        return {
          ...state,
          filterArticles: action.fetchedArticles,
        };
        default:
          return state;
    }
};
