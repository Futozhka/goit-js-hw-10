import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_I2PkU27SWAYmWF2tyLajjr3Vy2nw8D41p53DODY9bfCbMEurkhzT1oEzKj3Lo4PD';

function fetchBreeds() {
    return axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  
  function fetchCatByBreed(breedId) {
    return axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => response.data)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  
  export { fetchBreeds, fetchCatByBreed };