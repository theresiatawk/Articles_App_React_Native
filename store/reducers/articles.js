import { SET_ARTICLES } from "../actions/articles";

const initialState = {
    availableArticles: [],
}
export default (state = initialState, action) => { 
    switch (action.type) {
        case SET_ARTICLES:
          return { 
            availableArticles: action.articles 
        };
        default:
          return state;
    }
};
