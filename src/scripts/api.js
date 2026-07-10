export async function fetchBooks(query) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'TheLibraryLearningApp, (nathandurand604@gmail.com)'
      }
    })

    if(!response.ok) {
      throw new Error(`Http error! status: ${response.status}`)
    }

    const data = await response.json()

    console.log(data.docs)
  
    return data.docs || []

  } catch (error) {
    console.error('Failed to fetch books from Open Library', error.message)
    return null
  }

}