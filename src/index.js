import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery } from './js/fetchgallery';
import { Notify } from 'notiflix';
import axios from 'axios';
import PictureService from './js/fetchgallery'

const pictureService = new PictureService()
const INFO_MASSAGE = "We're sorry, but you've reached the end of search results."
const ERROR_MASSAGE = '"Sorry, there are no images matching your search query. Please try again."'
const OPTIONS_NOTIFLIX = {
    width: "460px",
    fontSize: "25px",
};

let lightbox = {}

const galleryWrap = document.querySelector('.gallery')
const form = document.querySelector('#search-form')
const loadMoreBtn = document.querySelector('.load-more')
loadMoreBtn.classList.add('is-hidden')

form.addEventListener('submit', onSearch)
loadMoreBtn.addEventListener('click', onLoadMore)

loadMoreBtn.classList.add('is-hidden')


async function onSearch(e) {
  e.preventDefault()

  clearGalleryMarkup()
  pictureService.query = e.currentTarget.elements.searchQuery.value.trim()

  if (!pictureService.query) {

    Notify.warning('Please write something', OPTIONS_NOTIFLIX)
    clearGalleryMarkup()
    loadMoreBtn.classList.add('is-hidden')
    form.reset()
    return;
  }

  pictureService.resetPage()
  const responspictureService = await pictureService.fetchGallery()
  await createGalleryMarkup(responspictureService.data.hits)
  if (responspictureService.data.total > 500) {
    Notify.info(`По вашему запросу было найдено ${responspictureService.data.total} совпадений, но показать сможем только 500 :) `, OPTIONS_NOTIFLIX)
  } else {
    Notify.info(`По вашему запросу было найдено ${responspictureService.data.total} совпадений `, OPTIONS_NOTIFLIX)
  }
  form.reset()
  lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  })
}

function createGalleryMarkup(cards) {
  // console.log(cards)
  // if (cards.length < 40 && cards.length > 0) {
  //   Notify.info(INFO_MASSAGE, OPTIONS_NOTIFLIX)
  //   loadMoreBtn.classList.add('is-hidden')
  // } if (cards.length === 0) {
  //   Notify.info(ERROR_MASSAGE, OPTIONS_NOTIFLIX)
  //   loadMoreBtn.classList.add('is-hidden')
  // }

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
        }) => `
        <div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: <br> ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: <br> ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: <br> ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: <br> ${downloads}</b>
          </p>
        </div>
        
      </div>
      `
      )
      .join('')
  )
  loadMoreBtn.classList.remove('is-hidden')
  if (cards.length < 40 && cards.length > 0) {
    Notify.info(INFO_MASSAGE, OPTIONS_NOTIFLIX)
    loadMoreBtn.classList.add('is-hidden')
  } if (cards.length === 0) {
    Notify.info(ERROR_MASSAGE, OPTIONS_NOTIFLIX)
    loadMoreBtn.classList.add('is-hidden')
  }
  // else {
    // loadMoreBtn.classList.remove('is-hidden')
  // }
  
  
}

function clearGalleryMarkup() {
  galleryWrap.innerHTML = ""
}

async function onLoadMore() {

  const responspictureService = await pictureService.fetchGallery()
  await createGalleryMarkup(responspictureService.data.hits)
  if (pictureService.page === 13) {
      Notify.info(INFO_MASSAGE, OPTIONS_NOTIFLIX)
      loadMoreBtn.classList.add('is-hidden')
      }
  lightbox.refresh()
}
 