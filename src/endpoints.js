const BASE_API = 'https://api.giphy.com/v1/gifs';
const API_KEY = process.env.REACT_APP_API_KEY

export const fetchTrendingGifs = function () {
  return fetch(BASE_API + `/trending?api_key=${API_KEY}&limit=25&rating=g`,
    {
      method: 'GET'
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      return error;
    })
};