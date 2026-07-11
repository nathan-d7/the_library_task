import '../styles/style.css'
import { fetchBooks } from './api'
import { renderBooks, showActiveContainer, renderFavBooks } from './render'
import { toggleFavourite, getFavourites } from './storage'

const searchForm = document.querySelector('.search__box')
const searchInput = document.querySelector('.search__input')

const booksSection = document.querySelector('.books-section')
const loader = document.querySelector('.books__loading-container')
const emptySearchQuery = document.querySelector('.books__search--empty-query-container')
const favorBooksList = document.querySelector('.favor-books-list')
const apiFailedBlock = document.querySelector('.books-api__fail-container')
const searchModeElement = document.querySelector('.search__mode-select-box')


let currentBooks = []

function init() {

  const initialFavs = getFavourites()

  if(initialFavs && initialFavs.length > 0 ) {
    renderFavBooks(initialFavs)
    renderBooks(initialFavs)
    currentBooks = initialFavs
  } else {
    renderFavBooks([])
  }


  searchForm.addEventListener('submit', async (e) => {

    e.preventDefault()
    const query = searchInput.value.trim()
    const searchMode = searchModeElement.value
   
    if (!query) {
      showActiveContainer(emptySearchQuery)
      return
    }

    showActiveContainer(loader)
    searchInput.value = ''
    const books = await fetchBooks(query, searchMode)
    loader.style.display = 'none'

    if(!books) {
      showActiveContainer(apiFailedBlock)
      currentBooks = []
      return
    }

    currentBooks = books
    renderBooks(books)

  })


  function handleLikeClick(e, isSidebar) {

    const iconSelector = isSidebar ? '.favor__book-liked-icon-box' : '.books__liked-icon'
    const cardSelector = isSidebar ? '.favor__book' : '.books__card'
    
    const favouriteIcon = e.target.closest(iconSelector)
    if (!favouriteIcon) return

    const bookCard = favouriteIcon.closest(cardSelector)
    const bookKey = bookCard.dataset.id

    let selectedBook

    if(isSidebar) {
      const favBooks = getFavourites()
      selectedBook = favBooks.find(b => b.key === bookKey)
    } else {
      selectedBook = currentBooks.find(b => b.key === bookKey)
    }

    if(selectedBook) {
      const updatedBooks = toggleFavourite(selectedBook)
      renderFavBooks(updatedBooks)

      if(isSidebar) {
        const mainCard = booksSection.querySelector(`[data-id="${bookKey}"]`)

        if(mainCard) {
          const mainIcon = mainCard.querySelector('.books__liked-icon')
          console.log(mainIcon)
          if(mainIcon) mainIcon.classList.remove('books__liked-icon--active')
        }
      } else {
        favouriteIcon.classList.toggle('books__liked-icon--active')
      }

    }
  }

  booksSection.addEventListener('click', (e) => handleLikeClick(e, false))
  favorBooksList.addEventListener('click', (e) => handleLikeClick(e, true))

}

init()