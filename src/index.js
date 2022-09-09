import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './js/fetchgallery';
import { Notify } from 'notiflix';
import axios from 'axios';
import PictureService from './js/fetchgallery'

const pictureService = new PictureService()

const galleryWrap = document.querySelector('.gallery')
const form = document.querySelector('#search-form')
const loadMoreBtn = document.querySelector('.load-more')

form.addEventListener('submit', onSearch)
loadMoreBtn.addEventListener('click', onLoadMore)

async function onSearch(e) {
  e.preventDefault()

  clearGalleryMarkup()
  pictureService.query = e.currentTarget.elements.searchQuery.value.trim()
  console.log(pictureService.query)

  if (!pictureService.query) {

    Notify.warning('Please write something')
    clearGalleryMarkup()
    // pictureService.query = ""
    form.reset()
    return;
  }

  pictureService.resetPage()
  const responspictureService = await pictureService.fetchGallery()
  await createGalleryMarkup(responspictureService.data.hits)
  form.reset()
}

function createGalleryMarkup(cards) {
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
  const responspictureService = await pictureService.fetchGallery()
  await createGalleryMarkup(responspictureService.data.hits)

}