export const SET_ARTICLES = "SET_ARTICLES";
export const SEARCH_ARTICLES = "SEARCH_ARTICLES";
export const FETCH_SPECIFIC_ARTICLES = "FETCH_SPECIFIC_ARTICLES";

export const searchArticles = (text) => {
  return { type: SEARCH_ARTICLES, payload: text };
};
export const fetchArticles = (page, text)=> {
  return async (dispatch, getState) => {
      const token = getState().users.token;
      console.log(token);
      const response = await fetch(
        "http://34.245.213.76:3000/articles?&page="+page,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
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
            publisher: resData.response.docs[key].byline.original,
            source: resData.response.docs[key].source,
            paragraph: resData.response.docs[key].lead_paragraph,
            imageUrl:resData.response.docs[key].multimedia[0] ? `https://static01.nyt.com/${resData.response.docs[key].multimedia[0].url}` : '',
        }
        ); 
      }
      console.log(loadedArticles);
      if (text === ""){
        dispatch({ type: SET_ARTICLES, articles: loadedArticles, fetchedArticles: loadedArticles});
      }
      else{
        const newData =[];
        dispatch({ type: SET_ARTICLES, articles: loadedArticles, fetchedArticles: loadedArticles});
        loadedArticles.filter((item) => {
            if ((item.abstract.toLowerCase().includes(text.toLowerCase()))){
                newData.push(item);
              }
            });
        console.log("----------------------New Data----------------------------");
        console.log(newData);
        dispatch({ type: SET_ARTICLES, articles: newData, fetchedArticles: newData});
      }
    }
};
