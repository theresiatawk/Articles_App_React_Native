import { LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { 
        token: action.token, 
    };
    case LOGOUT: 
        return initialState;
    default:
      return state;
  }
};

// export default authReducer;
