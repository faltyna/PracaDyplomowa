document.addEventListener('DOMContentLoaded', function() {
    // Fetch movie list from server
    fetch('/movie_list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            return response.json();
        })
        .then(data => {
            const movies = data.movies;
            const moviesContainer = document.getElementById('movies-container');

            if (movies && movies.length > 0) {
                movies.forEach(movie => {
                    const movieItem = createMovieItem(movie);
                    moviesContainer.appendChild(movieItem);
                });
            } else {
                moviesContainer.textContent = 'No movies found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch movies.');
        });
});

function createMovieItem(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie-item';

    // Image
    const image = document.createElement('img');
    image.src = movie.Poster_Link;
    image.alt = movie.Series_Title;
    image.className = 'movie-poster';
    movieDiv.appendChild(image);

    // Title and Year
    const title = document.createElement('h2');
    title.textContent = `${movie.Series_Title} (${movie.Released_Year})`;
    movieDiv.appendChild(title);

    // Genre
    const genre = document.createElement('p');
    genre.textContent = `Genre: ${movie.Genre}`;
    movieDiv.appendChild(genre);

    // IMDB Rating
    const rating = document.createElement('p');
    rating.textContent = `IMDB Rating: ${movie.IMDB_Rating}`;
    movieDiv.appendChild(rating);

    // Number of Votes
    const votes = document.createElement('p');
    votes.textContent = `Number of Votes: ${movie.No_of_Votes}`;
    movieDiv.appendChild(votes);

    // Gross
    const gross = document.createElement('p');
    gross.textContent = `Gross: ${movie.Gross}`;
    movieDiv.appendChild(gross); 

    // Overview
    const overview = document.createElement('p');
    overview.textContent = `Overview: ${movie.Overview}`;
    movieDiv.appendChild(overview);

    // Meta Score
    const metaScore = document.createElement('p');
    metaScore.textContent = `Meta Score: ${movie.Meta_score}`;
    movieDiv.appendChild(metaScore);

    // Director
    const director = document.createElement('p');
    director.textContent = `Director: ${movie.Director}`;
    movieDiv.appendChild(director);

    // Stars
    const stars = document.createElement('p');
    stars.textContent = `Stars: ${movie.Star1}, ${movie.Star2}, ${movie.Star3}, ${movie.Star4}`;
    movieDiv.appendChild(stars);

    return movieDiv;
}