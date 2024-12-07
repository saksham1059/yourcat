const apiKey = "19340f98";

async function searchMovies() {
  const query = document.getElementById("search-bar").value.trim();
  if (!query) return alert("Please enter a movie name.");

  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await res.json();

  const results = document.getElementById("results");
  results.innerHTML = "";

  if (data.Response === "True") {
    data.Search.forEach(movie => {
      const movieCard = `
        <div class="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <img src="${movie.Poster}" alt="${movie.Title}" class="rounded-lg mb-2">
          <h3 class="text-lg font-bold">${movie.Title}</h3>
          <button 
            onclick="viewDetails('${movie.imdbID}')" 
            class="bg-cyan-600 text-black mt-2 px-4 py-2 rounded-lg hover:bg-cyan-400 transition-all"
          >
            Details
          </button>
        </div>
      `;
      results.innerHTML += movieCard;
    });
  } else {
    results.innerHTML = `<p>No results found for "${query}".</p>`;
  }
}

async function viewDetails(imdbID) {
  const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
  const movie = await res.json();
  localStorage.setItem('movieData', JSON.stringify(movie));
  window.location.href = 'moviedetail.html';
}
