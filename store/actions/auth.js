export const LOGIN = 'LOGIN';

export const login = (username, password) => {
    return async dispatch => {
      const response = await fetch(
        'http://34.245.213.76:3000/auth/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password,
          })
        }
      );
      console.log(username);
      console.log(password);
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: LOGIN });
    };
  };
