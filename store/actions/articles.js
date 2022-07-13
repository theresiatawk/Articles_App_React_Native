export const SET_ARTICLES = "SET_ARTICLES";

export const fetchArticles = page => {
  return async (dispatch, getState) => {
      const token = getState().users.token;
      const response = await fetch(
        "http://34.245.213.76:3000/articles?&page="+page,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhbmRpZGF0ZSIsImlhdCI6MTY1NzY5MTI3OSwiZXhwIjoxNjU3NzI3Mjc5fQ.w6T4PEKYXRUiZDKPWABB6hKtPadh6Nx9ZUG8xHW6aPc" ,
          },
        }
      );
      if (!response.ok) {
        const resData = await response.json(); 
        console.log(resData);
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedArticles = [];
      for (const key in resData.response.docs) {
            loadedArticles.push({
            id: resData.response.docs[key]._id, 
            section: resData.response.docs[key].section_name,
            abstract: resData.response.docs[key].abstract, 
            publisher: resData.response.docs[key].original,
            source: resData.response.docs[key].source,
            paragraph: resData.response.docs[key].lead_paragraph,
            imageUrl:resData.response.docs[key].multimedia[0] ? `https://static01.nyt.com/${resData.response.docs[key].multimedia[0].url}` : '',
        }
        ); 
      }
      console.log(loadedArticles);
      dispatch({ type: SET_ARTICLES, articles: loadedArticles});
  };
}; 
