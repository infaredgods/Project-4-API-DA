// get references to HTML elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

// runs fetchAnime when a user clicks search
searchBtn.addEventListener("click", fetchAnime);

//Fetch data from Kitsu API
async function fetchAnime() {
  const query = searchInput.value.trim();

  // if the user types nothing, do nothing
  if (!query) return;

  //show "Loading..." message while waiting for API  
  results.innerHTML = `<p>Loading...</p>`;

  try {
    // build the Api URL using the users search text
    const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`);
    // convert the response into JSON
    const data = await response.json();

    // displays the results on the page
    displayResults(data.data);
  } catch (error) {
    // shows error message
    results.innerHTML = `<p>Error fetching data.</p>`;
  }
}

//display anime card
function displayResults(animeList) {
    // if API does not finds an anime
  if (animeList.length === 0) {
    results.innerHTML = `<p>No results found.</p>`;
    return;
  }

  results.innerHTML = animeList
    .map(anime => {
      const attributes = anime.attributes;

      return `
        <div class="card">
          <img src="${attributes.posterImage?.medium || ''}" alt="Poster">
          <h3>${attributes.canonicalTitle}</h3>
          <p>${attributes.synopsis?.substring(0, 200) || "No description."}...</p>
        </div>
      `;
    })
    .join("");
}