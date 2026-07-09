import '../styles/style.css'
import { fetchBooks } from './api'
import { renderBooks, showActiveContainer} from './render'

const searchForm = document.querySelector('.search__box')
const searchInput = document.querySelector('.search__input')

const loader = document.querySelector('.books__loading-container') 
const emptySearchQuery = document.querySelector('.books__search--empty-query-container')

function init() {

  searchForm.addEventListener('submit', async (e) => {

    e.preventDefault()
    const query = searchInput.value.trim()

    if (!query) {
      console.log('Please enter your query!')
      showActiveContainer(emptySearchQuery)
      return
    }

    showActiveContainer(loader)
    searchInput.value = ''
    const books = await fetchBooks(query)

    loader.style.display = 'none'

    renderBooks(books)
    
  })

}

init()