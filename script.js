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
//const filterBtns = document.querySelectorAll(".filter-btn")
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

let currentFilter = "all"

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
  updateCount()
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

movieList.addEventListener("click", (event) => {
    // 1. If the click was not on a BUTTON, return early
    //    hint: event.target.tagName === "BUTTON"
    if (event.target.tagName !== "BUTTON") {
        return
    } else {
        // 2. Get the card the button lives in
        //    hint: event.target.closest("li")
        console.log("You clicked a button!")
        const card = event.target.closest("li")

        if (event.target.classList.contains("remove-btn")) {
            // 3. Was it the remove button?
            //    - Check: event.target.classList.contains("remove-btn")
            //    - If yes: remove the card from the DOM entirely
            //      hint: card.remove()
            //    - // TODO: call updateCount() here — Phase 6
            //    - // TODO: call applyFilter(currentFilter) here — Phase 6
            card.remove()
            updateCount()
            applyFilter(currentFilter)
        } else if (event.target.classList.contains("watch-btn")) {
            // 4. Was it the watch button?
            //    - Check: event.target.classList.contains("watch-btn")
            //    - If yes: toggle the "watched" class on the card
            //      hint: card.classList.toggle("watched")
            //    - Update the button's textContent based on the new state:
            //      if the card now has .watched → set button text to "Unmark Watched"
            //      if it no longer has .watched → set button text to "Mark Watched"
            //      hint: card.classList.contains("watched") returns true or false
            //    - // TODO: call applyFilter(currentFilter) here — Phase 6
            card.classList.toggle("watched")
            console.log(card)
            let watchBtn = card.querySelector(".watch-btn")
            if (card.classList.contains("watched")) {
                watchBtn.textContent = "Mark Unwatched"
            } else {
                watchBtn.textContent = "Mark Watched"
            }
            //applyFilter(currentFilter)
        }
    }
    // Why do we attach the listener to #movie-list instead of to each button?
    // Answer: Because the buttons don't exist when the page first loads and there is potentially an unlimited number of them, 
    // so we use event delegation by attaching the listener to a parent element that does exist and can catch events from its children.
    //
    // What does event.target.closest("li") do?
    // Answer: It gets the closest ancestor element of the target that matches the argument.
})

function updateCount() {
  // 1. Query all cards in the list
  //    hint: movieList.querySelectorAll(".movie-card").length
  const movieNum = movieList.querySelectorAll(".movie-card").length

  // 2. Update movieCount.textContent
  //    e.g. "3 movies" or "1 movie" — handle the singular if you want a bonus
  if (movieNum == 1) {
    movieCount.textContent = movieNum + " movie"
  } else {
    movieCount.textContent = movieNum + " movies"
  }

}

function updateFilterButtons(activeFilter) {
  // 1. Loop over filterBtns
  // 2. On each button:
  //    - first remove "active-filter" from every button
  //    - then add it back only to the one whose id matches the active filter
  //      hint: btn.id === "filter-" + activeFilter
  for (let i = 0; i < filterBtns.length; i++) {
    let button = filterBtns[i]
    button.classList.remove("active-filter")
    if (button.id === "filter-"+activeFilter) {
        button.classList.add("active-filter")
    }
  }
}

function applyFilter(filter) {
  // 1. Update the currentFilter variable so the rest of the app knows what's active
  currentFilter = filter

  // 2. Update which button looks active
  //    hint: call updateFilterButtons(filter)
  updateFilterButtons(filter)

  // 3. Get all cards in the list
  //    hint: movieList.querySelectorAll(".movie-card")
  let allCards = movieList.querySelectorAll(".movie-card")

  // 4. Loop over every card and decide: show it or hide it?
  //    if filter === "all"       → show every card
  //    if filter === "watched"   → show cards with .watched, hide the rest
  //    if filter === "unwatched" → show cards without .watched, hide the rest
  //    hint: card.classList.contains("watched") tells you the card's current state
  //    hint: card.classList.add("filtered-out") hides it, .remove("filtered-out") shows it
  for (let i = 0; i < allCards.length; i++) {
    let card = allCards[i]
    if (filter === "all") {
        card.classList.remove("filtered-out")
    } else if (filter === "watched") {
        if (card.classList.contains("watched")) {
            card.classList.remove("filtered-out")
        } else {
            card.classList.add("filtered-out")
        }
    } else if (filter === "unwatched") {
        if (card.classList.contains("watched")) {
            card.classList.add("filtered-out")
        } else {
            card.classList.remove("filtered-out")
        }
    }

  }
}

// The filter-all button calls applyFilter("all")
// The filter-watched button calls applyFilter("watched")
// The filter-unwatched button calls applyFilter("unwatched")

// You can do this with three separate addEventListener calls — one per button
// Or loop over filterBtns and extract the filter name from each button's id
//   hint: btn.id.replace("filter-", "") turns "filter-watched" into "watched"
for (let i = 0; i < filterBtns.length; i++) {
    let button = filterBtns[i]
    let filterName = button.id
    let filterType = filterName.replace("filter-","")
    console.log(filterName)
    button.addEventListener("click", (event) => {
        // These are buttons but check just incase.
        if (event.target.tagName !== "BUTTON") {
            return
        } else {
            applyFilter(filterType)
        }
    })
}

clearWatchedBtn.addEventListener("click", () => {
  // 1. Select all cards that currently have the "watched" class
  //    hint: movieList.querySelectorAll(".watched")
  let watchedCards = movieList.querySelectorAll(".watched")

  // 2. Loop over them and call .remove() on each
  for (let i = 0; i < watchedCards.length; i++) {
    let card = watchedCards[i]
    card.remove()
  }

  // 3. Call updateCount()
  updateCount()

  // 4. Call applyFilter(currentFilter)
  applyFilter(currentFilter)
})