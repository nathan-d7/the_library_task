export function getFavourites() {
  const favouritesData = localStorage.getItem('favourites')
  return favouritesData ? JSON.parse(favouritesData) : []
}

function saveFavourites(favourites) {
  localStorage.setItem('favourites', JSON.stringify(favourites))
}

export function toggleFavourite(book) {
  const favourites = getFavourites()
  const favouriteExist =  favourites.find(b => book.key === b.key)

  let updatedFavourites

  if(favouriteExist) {
    updatedFavourites = favourites.filter(b => b.key !== book.key)
  } else {
    updatedFavourites = [...favourites, book]
  }

  saveFavourites(updatedFavourites)
  return updatedFavourites

} 