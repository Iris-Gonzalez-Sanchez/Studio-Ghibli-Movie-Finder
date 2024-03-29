document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((data) => {
      renderMovieImages(data);
      renderMovieDetails(data[0]);
      let filterInput = document.getElementById("input-field");
      filterInput.addEventListener("change", (e) => {
        searchBar(data);
      });
    });

  let completedForm = false;
  const formBtn = document.getElementById("search-btn");
  const formContainer = document.querySelector("#input-field");
  formContainer.style.display = "none"; // hide search bar by default
  formBtn.addEventListener("click", () => {
    // toggle search bar visibility
    completedForm = !completedForm;
    if (completedForm) {
      formContainer.style.display = "block";
      document.querySelector("#text-question button").textContent =
        "♢ Invisible ♢";
    } else {
      formContainer.style.display = "none";
      document.querySelector("#text-question button").textContent =
        "♦︎ Visible! ♦︎";
    }
  });

  function renderMovieImages(data) {
    data.forEach((movie) => {
      const imageTag = document.createElement("img");
      imageTag.src = movie.image;
      const imageContainer = document.getElementById("image-container");
      // console.log(imageContainer)
      imageTag.className = "film-image";
      imageContainer.append(imageTag);
      imageTag.addEventListener("click", () => renderMovieDetails(movie));
    });
  }

  function renderMovieDetails(data) {
    const movieTitle = document.getElementById("name");
    movieTitle.textContent = data.title;

    const movieLength = document.getElementById("movie-length");
    movieLength.textContent = `${data.running_time} Minutes`;

    const movieImage = document.getElementById("movie-image");
    movieImage.src = data.image;

    const movieDetail = document.getElementById("description");
    movieDetail.textContent = data.description;
  }

  function searchBar(data) {
    const arrayOfMovies = data;
    // console.log(eventObject.target.value)
    let filterValue = document.getElementById("input-field").value;
    // console.log(data)
    const newData = arrayOfMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(filterValue.toLowerCase());
    });

    const imagesShown = document.getElementById("image-container");
    // console.log(filterValue.toLowerCase() ==='')
    if (filterValue.toLowerCase() === "") {
      imagesShown.innerHTML = " ";
      renderMovieImages(data);
    } else {
      imagesShown.innerHTML = " ";
      renderMovieImages(newData);
    }
  }
});
