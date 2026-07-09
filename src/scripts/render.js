let booksList = document.querySelector('.books__list')
const booksSection = document.querySelector('.books-section')
const loader = document.querySelector('.books__loading-container') 

export function showActiveContainer(targetContainer) {
   
  booksSection.innerHTML = ''

  if(targetContainer) {
    targetContainer.style.display = 'flex'
    booksSection.append(targetContainer)
  }
}


function createBookCard(book) {

  const hasCover = Boolean(book.cover_i)
  const bookCoverLink = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

  const bookCard = `
    <article class="books__card">

      <div class="books__card-cover-box">
      
        ${hasCover ?
        `<img class="books__card-cover" src="${bookCoverLink}" alt="${book.title}" />`
        :
        `<div class="books__card-cover-placeholder">
          <img class="books__card-cover-placeholder--icon" src="../../assets/icons/book.svg" alt="No coveravailable" />
        </div>`
        }

        <button class="books__liked-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export function renderBooks(books) {

  if (!books) {
    booksList.style.display = 'flex'
    booksList.innerHTML = `<p class="error">No books found. Try another search!</p>`
    return
  }

  showActiveContainer(null)
  booksList.style.display = 'grid'

  const htmlList = books.map(book => createBookCard(book))
  booksList.innerHTML = htmlList.join('')
  booksSection.append(booksList)

}