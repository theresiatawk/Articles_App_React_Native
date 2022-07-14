import { AUTHENTICATE, LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { 
        token: action.token,  
    };
    case AUTHENTICATE:
      return { 
        token: action.token,
    };
    case LOGOUT:
        return {
          token: null
        }
    default:
      return state;
  }
};
