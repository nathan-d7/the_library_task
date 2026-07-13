import '../styles/style.css'
import { fetchBooks } from './api'
import { renderBooks, showActiveContainer, renderFavBooks } from './render'
import { toggleFavourite, getFavourites } from './storage'
import { initTheme } from './theme'

const searchForm = document.querySelector('.search__box')
const searchInput = document.querySelector('.search__input')

const booksSection = document.querySelector('.books-section')
const loader = document.querySelector('.books__loading-container')
const emptySearchQuery = document.querySelector('.books__search--empty-query-container')
const favorBooksList = document.querySelector('.favor-books-list')
const apiFailedBlock = document.querySelector('.books-api__fail-container')
const searchModeElement = document.querySelector('.search__mode-select-box')


// The array to store the received books 
let currentBooks = []

function init() {

  initTheme()

  // Getting the data from the local storage
  const initialFavs = getFavourites()

  /*
    If we have data in the local storage - 
    we render the books for the main section 
    and the favourites sidebar
  */ 
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

    // Before getting the data from API - we define the search mode (all / by author)
    const searchMode = searchModeElement.value
   
    // If we submit an empty query - we show a corresponding message block
    if (!query) {
      showActiveContainer(emptySearchQuery)
      return
    }

    // If we submit a query - while waiting for the data we show the loading block
    showActiveContainer(loader)

    // Cleaning up the input after submiting a query
    searchInput.value = ''
    const books = await fetchBooks(query, searchMode)
    // Hiding the loader after receiving the data 
    loader.style.display = 'none'

    // Handling API network/server errors
    if(!books) {
      showActiveContainer(apiFailedBlock)
      currentBooks = []
      return
    }

    // Saving the received array of books and rendering the received books items
    currentBooks = books
    renderBooks(books)

  })

  /*
    A click handler to implement adding to favourites functionality;
    the function receives the event object and a boolean to define which card's like button is clicked
    to sync the likes between the main and the sidebar book cards
  */ 

  function handleLikeClick(e, isSidebar) {

    // Getting the type of book card (either from the book section or from the favourites section)
    const iconSelector = isSidebar ? '.favor__book-liked-icon-box' : '.books__liked-icon'
    const cardSelector = isSidebar ? '.favor__book' : '.books__card'
    
    // Getting the info which like button is triggered
    const favouriteIcon = e.target.closest(iconSelector)
    if (!favouriteIcon) return

    // Getting the targeted book card and its id
    const bookCard = favouriteIcon.closest(cardSelector)
    const bookKey = bookCard.dataset.id

    let selectedBook

    /*
      If it's a card from the favourites section we look for the selected book in the local storage,
      if not - that's a card from the book section
    */ 
    if(isSidebar) {
      const favBooks = getFavourites()
      selectedBook = favBooks.find(b => b.key === bookKey)
    } else {
      selectedBook = currentBooks.find(b => b.key === bookKey)
    }

    if(selectedBook) {
      // Adding the liked book to local storage and rerendering the favourites section
      const updatedBooks = toggleFavourite(selectedBook)
      renderFavBooks(updatedBooks)
     
      /*
        If it's a card from the favourites which is triggered - 
        we look for the corresponding book card in the book section 
        to remove the liked state and delete the book from the favourites
      */ 
     
      if(isSidebar) {
        const mainCard = booksSection.querySelector(`[data-id="${bookKey}"]`)

        if(mainCard) {
          const mainIcon = mainCard.querySelector('.books__liked-icon')
          if(mainIcon) mainIcon.classList.remove('books__liked-icon--active')
        }
      } else {
        favouriteIcon.classList.toggle('books__liked-icon--active')
      }
    } else return
  }

  booksSection.addEventListener('click', (e) => handleLikeClick(e, false))
  favorBooksList.addEventListener('click', (e) => handleLikeClick(e, true))

}

init()