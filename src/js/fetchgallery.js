import axios from 'axios'
export default class PictureService {
  constructor() {
    this.searchQuery = " "
    this.page = 1
    this.perPage = 40
  }
  
  async fetchGallery() {
    axios.defaults.baseURL = 'https://pixabay.com/api/'
    const KEY = '29780363-e0273b64f82bba5b73a3e8070'
      try {
        const response = await axios.get(`?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`)
        this.page += 1
        return response
      } catch (error) {
        console.log(error)
    }
     
  }

  get query() {
    return this.searchQuery
  }
  
  set query(newQuey) {
    this.searchQuery = newQuey
  }

  resetPage() {
    this.page = 1
  }
}














// export { fetchGallery }

// axios.defaults.baseURL = 'https://pixabay.com/api/'
// const KEY = '29780363-e0273b64f82bba5b73a3e8070'

// async function fetchGallery(query, page, perPage) {
//   try {
//     const response = await axios.get(`?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
//     return response
//   } catch (error) {
//     console.log(error)
//   }
// }