export function getFavourites() {
  const favouritesData = localStorage.getItem('favourites')
  return favouritesData ? JSON.parse(favouritesData) : []
}

function saveFavourites(favourites) {
  localStorage.setItem('favourites', JSON.stringify(favourites))
}

// Handling adding and removing a book item from the local storage
export function toggleFavourite(book) {
  const favourites = getFavourites()
  // Looking for the passed book item in the storage
  const favouriteExist =  favourites.find(b => book.key === b.key)

  let updatedFavourites

  /*
    If the item exists - we remove it from the storage by filtering,
    else - we add the book item to the updating array
  */ 
  if(favouriteExist) {
    updatedFavourites = favourites.filter(b => b.key !== book.key)
  } else {
    updatedFavourites = [...favourites, book]
  }

  // Update the storage state
  saveFavourites(updatedFavourites)
  return updatedFavourites

} 