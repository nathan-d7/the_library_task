import { getFavourites } from "./storage"
import bookPlaceholder from '../../assets/icons/book.svg'

let booksList = document.querySelector('.books__list')
const booksSection = document.querySelector('.books-section')
const loader = document.querySelector('.books__loading-container')
const favouritesList = document.querySelector('.favor-books-list')
const favouritesListCounter = document.querySelector('.favor__items-counter')

// A function to handle empty / empty search / errors container
export function showActiveContainer(targetContainer) {

  booksSection.innerHTML = ''
  const currentFavs = getFavourites()

  if (targetContainer) {
    
    if(currentFavs.length > 0) {
      booksSection.classList.add('self-start')
    } else {
      booksSection.classList.remove('self-start')
    }
    
    targetContainer.style.display = 'flex'
    booksSection.append(targetContainer)
  }
}

function createBookCard(book, favourites) {

  const hasCover = Boolean(book.cover_i)
  const bookCoverLink = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

  /*
    Defining the flag making sure if a book is added to the favourites - 
    it keeps the like icon active
  */ 
  let isLiked = favourites.find(fav => fav.key === book.key)

  const bookCard = `
    <article class="books__card" data-id="${book.key}">

      <div class="books__card-cover-box">
      
        ${hasCover ?
      `<img class="books__card-cover" src="${bookCoverLink}" alt="${book.title}" />`
      :
      `<div class="books__card-cover-placeholder">
          <img class="books__card-cover-placeholder--icon" src="${bookPlaceholder}" alt="No cover" />
        </div>`
    }

        <button class="books__liked-icon ${isLiked ? 'books__liked-icon--active' : ''}">
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
              stroke="#7C736A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <a href="https://openlibrary.org/${book.key}" class="books__info" target="_blank">
        <span class="books__title">${book.title}</span>
        <span class="books__author text">${book.author_name ? book.author_name[0] : "Unknown Author"}</span>
        <span class="books__year text">${book.first_publish_year}</span>
      </a>
  </article>
  `
  return bookCard
}

function createFavBookCard(favBook, favourites) {
  const hasCover = Boolean(favBook.cover_i)
  const cover = `https://covers.openlibrary.org/b/id/${favBook.cover_i}-S.jpg`
  let isLiked = favourites.find(fav => fav.key === favBook.key)

  const favBookCard = `
  
    <li class="favor__book" data-id="${favBook.key}">

      <a href="https://openlibrary.org/${favBook.key}" class="favor__book-cover-box" target="_blank">
        <img class="favor__book-cover" src="${hasCover ? cover : bookPlaceholder}" alt="No cover">
      </a>

      <div class="favor__book-info">
        <span class="favor__book-title">${favBook.title}</span>
        <span class="favor__book-author text">${favBook.author_name ? favBook.author_name[0] : "Unknown Author"}</span>
        <span class="favor__book-year text">${favBook.first_publish_year}</span>
      </div>

      <div class="favor__book-liked-icon-box ${isLiked ? 'books__liked-icon--active' : ''}">
        <svg width="16px" height="16px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z"
            stroke="#7C736A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </li>
  
  `

  return favBookCard

}

export function renderBooks(books) {

  // Emptying the book section before rendering a new set of books
  showActiveContainer(null)
  booksList.style.display = 'grid'

  /*
    Gettign an array of liked books to pass it to CreateBookCard and 
    check which book cards have the like icon activated
  */ 
  const currentFavs = getFavourites()

  const htmlList = books.map(book => createBookCard(book, currentFavs))
  booksList.innerHTML = htmlList.join('')
  booksSection.append(booksList)

}

export function renderFavBooks(favBooks) {

  if (!favBooks.length) {
    console.log(favBooks)
    favouritesList.innerHTML = `<li class="favor-books-list--empty text">Your favourite books list is empty</li>`
    favouritesListCounter.textContent = '0'
    return
  }

  const currentFavs = getFavourites()
  // Updating the counter of the favourites
  favouritesListCounter.textContent = favBooks.length

  const htmlList = favBooks.map(book => createFavBookCard(book, currentFavs))
  favouritesList.innerHTML = htmlList.join('')

}