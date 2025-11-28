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

  // insert HTML first
  results.innerHTML = animeList
    .map(anime => {
      const a = anime.attributes;

      return `
        <div class="card" style="opacity: 0; transform: scale (0.8);">
          <img src="${a.posterImage?.medium || ''}" alt="Poster">
          <h3>${a.canonicalTitle}</h3>
          <p>${a.synopsis?.substring(0, 200) || "No description."}...</p>
        </div>
      `;
    })
    .join("");

    


    
    // Click to expand/collapse cards
    const cards = results.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });
    });

// Animate each card with Popmotion
    cards.forEach((card, i) => {
        popmotion.tween({
            from: { opacity: 0, scale: 0.8 },
            to: { opacity: 1, scale: 1 },
            duration: 400,
            delay: i * 120
        }).start(v => {
            card.style.opacity = v.opacity;
            card.style.transform = `scale(${v.scale})`;
        });
    });
}