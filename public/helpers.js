function createMovieItem(movie) {
    // Utwórz kontener na film
    const movieDiv = document.createElement('div'); 
    movieDiv.className = 'movie-item';

    // Dodaj obrazek
    const image = document.createElement('img');
    image.src = movie.Poster_Link;
    image.alt = movie.Series_Title;
    image.className = 'movie-poster';
    movieDiv.appendChild(image);

    // Utwórz kontener na szczegóły filmu
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'movie-details';

    // Dodaj tytuł i rok wydania
    const title = document.createElement('h2');
    title.textContent = `${movie.Series_Title} (${movie.Released_Year})`;
    detailsDiv.appendChild(title);

    // Dodaj gatunek
    const genre = document.createElement('p');
    genre.textContent = `${movie.Genre}`;
    detailsDiv.appendChild(genre);

    // Dodaj ocenę w postaci gwiazdki
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'star-rating';
    const star = document.createElement('span');
    star.className = 'star';
    star.innerHTML = '&#9733;';  // Pojedyncza gwiazdka
    ratingDiv.appendChild(star);
    const ratingNumber = document.createElement('span');
    ratingNumber.className = 'rating-number';
    ratingNumber.textContent = movie.IMDB_Rating;
    ratingDiv.appendChild(ratingNumber);
    detailsDiv.appendChild(ratingDiv);

    // Dodaj opis
    const overview = document.createElement('p');
    overview.className = 'movie-overview';
    overview.textContent = `${movie.Overview}`;
    detailsDiv.appendChild(overview);

    // Dodaj szczegóły filmu do kontenera filmu
    movieDiv.appendChild(detailsDiv);

    // Dodaj event listener do całego kontenera filmu
    movieDiv.addEventListener('click', () => showRecommendations(movie.Series_Title));

    return movieDiv;
}