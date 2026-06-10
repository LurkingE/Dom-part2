const appTitle = document.getElementById("app-title")
const movieCount = document.getElementById("movie-count")
const movieForm = document.getElementById("movie-form")
const titleInput = document.getElementById("title-input")
const genreInput = document.getElementById("genre-input")
const movieList = document.getElementById("movie-list")
const clearWatchedBtn = document.getElementById("clear-watched-btn")

// select #movie-form        → store in movieForm
// select #title-input       → store in titleInput
// select #genre-input       → store in genreInput
// select #movie-list        → store in movieList
// select #clear-watched-btn → store in clearWatchedBtn

console.log(appTitle)
console.log(movieCount)
console.log(movieForm)
console.log(genreInput)
console.log(movieList)
console.log(clearWatchedBtn)

// select ALL elements with class "filter-btn" using querySelectorAll
// store them in filterBtns — you'll loop over them in Phase 6
const filterBtns = document.getElementsByClassName("filter-btn")
console.log(filterBtns)

// Change the app title
appTitle.textContent = "My Movie Watchlist"

// Read and log the current count text
console.log("Count says:", movieCount.textContent)

// Update the count text manually (JavaScript will keep this accurate later)
movieCount.textContent = "0 movies"

// .add() puts a class on the element
movieCount.classList.add("active-filter")
// Look at the browser — what changed?

// .remove() takes it off
movieCount.classList.remove("active-filter")

// .toggle() adds if missing, removes if present — one call does both
movieCount.classList.toggle("active-filter")
movieCount.classList.toggle("active-filter")

// getAttribute reads the HTML attribute as it was written in the file
console.log(titleInput.getAttribute("placeholder"))  // → "Movie title..."
console.log(titleInput.getAttribute("type"))         // → "text"
console.log(titleInput.getAttribute("required"))     // → "" (empty string = it exists)

// setAttribute changes or adds an attribute
titleInput.setAttribute("placeholder", "Try: The Matrix")
// Refresh — the placeholder text in the input changed

// removeAttribute removes it entirely
titleInput.removeAttribute("required")
// The input is no longer required — blank submissions won't be blocked
titleInput.setAttribute("required", "")  // put it back

titleInput.getAttribute("value")  // → null (the HTML never had a value attribute)
titleInput.value                  // → whatever you just typed

movieForm.addEventListener("submit", (event) => {
  // 1. Stop the browser from reloading the page
  //    Without this line, the page refreshes on every submit and you lose everything
  event.preventDefault()

  // 2. Read the movie title from the input — use .value, not getAttribute
  const title = titleInput.value
 
  // 3. Read the genre the same way
  const genre = genreInput.value

  // 4. Log both values to the console
  //    Type a title and genre, submit — confirm you see them in DevTools
  console.log(title)
  console.log(genre)

  // 5. At the end, reset the form so the inputs are blank for the next entry
  movieForm.reset()
  //    .reset() clears all inputs in the form at once — no need to blank them one by one

  // 6. Don't build cards yet — that's Phase 4
  let newCard = createMovieCard(title, genre)
  movieList.appendChild(newCard)
})

function createMovieCard(title, genre) {
  // 1. Create the outer <li>
  //    - give it the class "movie-card"
  //    - use setAttribute to set data-genre to the genre value
  const card = document.createElement('li')
  card.classList.add("movie-card")
  card.setAttribute("genre", genre)

  // 2. Create a <div> for the info section — class "movie-info"
  //    Inside it, create two <span> elements:
  //    - one with class "movie-title" — set its textContent to title
  //    - one with class "movie-genre" — set its textContent to genre (show "No genre" if empty)
  //    Append both spans into the info div
  const movieInfo = document.createElement('div')
  movieInfo.classList.add("movie-info")

  const movieTitle = document.createElement('span')
  movieTitle.classList.add("movie-title")
  movieTitle.textContent = `Name: ${title}  `


  const movieGenre = document.createElement('span')
  movieGenre.classList.add("movie-genre")
  movieGenre.textContent = `Genre: ${genre}  `

  movieInfo.appendChild(movieTitle)
  movieInfo.appendChild(movieGenre)

  // 3. Create a <div> for the buttons — class "movie-actions"
  //    Inside it, create two <button> elements:
  //    - one with class "watch-btn" — textContent "Mark Watched"
  //    - one with class "remove-btn" — textContent "Remove"
  //    Append both buttons into the actions div
  const movieActions = document.createElement('div')
  movieActions.classList.add("movie-actions")

  const watchBtn = document.createElement('button')
  watchBtn.classList.add("watch-btn")
  watchBtn.textContent = "Mark Watched"

  const removeBtn = document.createElement('button')
  removeBtn.classList.add("remove-btn")
  removeBtn.textContent = "Remove"

  movieActions.appendChild(watchBtn)
  movieActions.appendChild(removeBtn)

  // 4. Append the info div and actions div into the <li>
  card.appendChild(movieInfo)
  card.appendChild(movieActions)

  // 5. return the card — do NOT append it here
  //    The function's job is to build and return. Appending is the caller's job.
  return card
}