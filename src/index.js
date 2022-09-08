import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './js/fetchgallery';
import { Notify } from 'notiflix';
import axios from 'axios';

const refs = {
  galleryWrap: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let page = 1
let perPage = 40
let searchQuery = ''

refs.form.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore)

async function onSearch(e) {
  e.preventDefault()

  searchQuery = e.currentTarget.elements.searchQuery.value.trim()
  console.log(searchQuery)
  if (!searchQuery) {
    
    Notify.warning('Please write something')
    clearGalleryMarkup()
    searchQuery = null
    return;
  }
  const aaa = await fetchGallery(searchQuery, page, perPage)
  console.log(aaa)

  await createGalleryMarkup(aaa.data.hits)
  refs.form.reset()
}

function createGalleryMarkup(cards) {
  console.log(cards)
  refs.galleryWrap.insertAdjacentHTML(
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
  refs.galleryWrap.innerHTML = ""
}

function onLoadMore() {}