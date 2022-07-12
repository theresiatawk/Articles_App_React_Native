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

      let messageAlert = "Something went wrong!";
      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorResData);
        if (errorResData.message === "Cannot POST /auth/signinn"){
            messageAlert = "Something went wrong!!"
        }
        if (errorResData.message === "Please check your login credentials"){
            messageAlert = "Please check your login credentials";
        }
        throw new Error(messageAlert);
      }
      messageAlert = "Something went wrong!";
  
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: LOGIN, token: resData.accessToken});
    };
  };