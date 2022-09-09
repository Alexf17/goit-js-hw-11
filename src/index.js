import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './js/fetchgallery';
import { Notify } from 'notiflix';
import axios from 'axios';
import  API from './js/fetchgallery'

const Api = new API()

const galleryWrap = document.querySelector('.gallery')
const form = document.querySelector('#search-form')
const loadMoreBtn = document.querySelector('.load-more')


// let page = 1
// let perPage = 40


form.addEventListener('submit', onSearch)
loadMoreBtn.addEventListener('click', onLoadMore)

async function onSearch(e) {
  e.preventDefault()

  Api.query = e.currentTarget.elements.searchQuery.value.trim()
  console.log(Api.query )
  if (!Api.query ) {
    
    Notify.warning('Please write something')
    clearGalleryMarkup()
    Api.query  = ""
    return;
  }

  const responsApi = await Api.fetchGallery()
  await createGalleryMarkup(responsApi.data.hits)
  Api.resetPage()
  form.reset()
}

function createGalleryMarkup(cards) {
  console.log(cards)
  galleryWrap.insertAdjacentHTML(
    'beforeend',
    cards
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `<div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
        </a>
      </div>`
      )
      .join('')
  );
}

function clearGalleryMarkup() {
  galleryWrap.innerHTML = ""
}

async function onLoadMore() {
  const responsApi = await Api.fetchGallery()
  await createGalleryMarkup(responsApi.data.hits)

}