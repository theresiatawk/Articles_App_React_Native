export const SET_ARTICLES = "SET_ARTICLES";

export const fetchArticles = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.token;
      console.log(token);
      const response = await fetch(
        "http://34.245.213.76:3000/articles?page=1",
        {
          method: "GET",
          headers: new Headers({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: SET_ARTICLES });
    } catch (error) {
      throw error;
    }
  };
};
