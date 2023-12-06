import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const body = document.querySelector('body');



const hideElement = element => {
  element.style.display = 'none';
};

const showElement = element => {
  element.style.display = 'block';
};

const populateBreedsSelect = breeds => {
  select.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
};

const displayCatInfo = catData => {
  const { breeds } = catData[0];

  catInfo.innerHTML = `
    <div><img src="${catData[0].url}" width="400" alt="${breeds[0].name}"></div>
    <div>
      <h3>${breeds[0].name}</h3>
      <p>Description: ${breeds[0].description}</p>
      <p>Temperament: ${breeds[0].temperament}</p>
    </div>
  `;

  catInfo.style.display = 'flex';
  catInfo.style.gap = '30px';
  catInfo.style.marginTop = '50px';
};

const handleBreedSelectChange = () => {
  const selectedBreed = select.value;
  hideElement(catInfo);
  showElement(loader);

  fetchCatByBreed(selectedBreed)
    .then(displayCatInfo)
    .catch(error => {
      console.error(error);
      hideElement(loader);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => showElement(catInfo));
};

const initializeApp = () => {
  hideElement(select);
  fetchBreeds()
    .then(breeds => {
      showElement(select);
      hideElement(loader);
      populateBreedsSelect(breeds);
    })
    .catch(error => {
      console.error(error);
      hideElement(loader);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
};

select.addEventListener('change', handleBreedSelectChange);

initializeApp();
