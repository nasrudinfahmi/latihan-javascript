// const btnSearch = document.querySelector(".button-search");
// const inputKeyword = document.querySelector(".input-keyword");

// btnSearch.addEventListener("click", function () {
//   fetch("http://www.omdbapi.com/?apikey=c013c12f&s=" + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       // console.log(movies)
//       let cards = "";
//       movies.forEach((movie) => {
//         cards += showCards(movie);
//       });

//       const cardContainer = document.querySelector(".card-container");
//       cardContainer.innerHTML = cards;

//       const showDetail = document.querySelectorAll(".show-detail");
//       showDetail.forEach((button) => {
//         button.addEventListener("click", function () {
//           const imdbid = button.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=c013c12f&i=" + imdbid)
//             .then((response) => response.json())
//             .then((movie) => {
//               const m = showDetailMovie(movie);

// const modalContainer = document.querySelector(".modal-container");
// modalContainer.innerHTML = m;
//             });
//         });
//       });
//     });
// });


// ---------- setelah refactoring ----------

const btnSearch = document.querySelector(".button-search");
const inputKeyword = document.querySelector(".input-keyword");

btnSearch.addEventListener("click", async function () {
  const cardsMovies = await getMovie(inputKeyword.value);
  updateUi(cardsMovies);
});

function getMovie(input) {
  return fetch("http://www.omdbapi.com/?apikey=c013c12f&s=" + input)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUi(cardsMovies) {
  let cards = "";
  cardsMovies.forEach((movie) => {
    cards += showCards(movie);
  });
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = cards;
}

// event binding

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("close-button")) {
    const modalContainer = document.querySelector(".modal-container");
    e.target.parentElement.parentElement.style.display = "none";
    modalContainer.style.display = "none";
    document.body.style.overflow = "auto";
  } else if (e.target.classList.contains("show-detail")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateMovieDetail(movieDetail);
    modalStyle();
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=c013c12f&i=" + imdbid)
    .then((response) => response.json())
    .then((movie) => movie);
}

function updateMovieDetail(movie) {
  const modalContainer = document.querySelector(".modal-container");
  const modalDetail = showDetailMovie(movie);
  modalContainer.innerHTML = modalDetail;
  modalContainer.style.display = "block";
  document.body.style.overflow = "hidden";
}

function showCards(movie) {
  return `<div class="card">
            <img src="${movie.Poster}">
            <div class="card-body">
              <h3 class="title-card">${movie.Title}</h3>
              <h4 class="year-card">${movie.Year}</h4>
              <button type="button" class="show-detail" data-imdbid="${movie.imdbID}">Show Detail</button>
            </div>
          </div>`;
}

function showDetailMovie(movie) {
  return `<div class="row">
            <div class="image-container">
              <img src="${movie.Poster}">
            </div>
            <div class="detail">
              <ul class="list-group">
                <li><h4>${movie.Title} ${movie.Year}</h4></li>
                <li><strong>Genre : </strong>${movie.Genre}</li>
                <li><strong>Director : </strong>${movie.Director}</li>
                <li><strong>Actors : </strong>${movie.Actors}</li>
                <li><strong>Writer : </strong>${movie.Writer}</li>
                <li><strong>Plot : </strong><br>${movie.Plot}</li>
              </ul>
              <button type="button" class="close-button">Close</button>
            </div>
          </div>`;
}
