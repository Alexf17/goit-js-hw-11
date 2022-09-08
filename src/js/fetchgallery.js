import axios from 'axios'
export { fetchGallery }

axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = '29780363-e0273b64f82bba5b73a3e8070'

async function fetchGallery(query, page, perPage) {
  try {
    const response = await axios.get(`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}