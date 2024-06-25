document.addEventListener('DOMContentLoaded', function() {
    // Pobierz listę filmów z serwera
    fetch('http://127.0.0.1:5000/movie_list')
        .then(response => {
            if (!response.ok) {
                console.log("Not ok");
                console.log(response);
                throw new Error('Failed to fetch movies');
            }
            return response.json();
        })
        .then(data => {
            const movies = data.movies;
            const moviesContainer = document.getElementById('movies-container');
            window.moviesData = movies;
            window.filteredMovies = movies; // Inicjalizuj filteredMovies wszystkimi filmami
            const genres = new Set();

            if (movies && movies.length > 0) {
                movies.forEach(movie => {
                    const movieItem = createMovieItem(movie);
                    moviesContainer.appendChild(movieItem);
                    movie.Genre.split(', ').forEach(genre => genres.add(genre.trim()));
                });

                // Dodaj gatunki do panelu bocznego
                const genreList = document.getElementById('genre-list');
                genres.forEach(genre => {
                    const li = document.createElement('li');
                    li.textContent = genre;
                    li.addEventListener('click', () => {
                        filterMoviesByGenre(genre);
                        closeSortOptions(); // Ukryj opcje sortowania
                    });
                    genreList.appendChild(li);
                });
            } else {
                moviesContainer.textContent = 'No movies found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch movies.');
        });

    // Dodaj event listener do przycisku wyszukiwania
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', searchMovies);

    // Dodaj event listener do przycisku otwierania panelu bocznego
    const openBtn = document.getElementById('open-btn');
    openBtn.addEventListener('click', () => {
        openNav();
        closeSortOptions(); // Ukryj opcje sortowania
    });

    // Dodaj event listener do przycisku zamykania panelu bocznego
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', closeNav);

    // Dodaj event listener do przycisku powrotu na stronę główną
    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', showAllMovies);

    // Dodaj event listener do przycisku sortowania
    const sortBtn = document.getElementById('sort-btn');
    sortBtn.addEventListener('click', toggleSortOptions);

    // Dodaj event listener do opcji sortowania
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(button => {
        button.addEventListener('click', () => {
            sortMovies(button.dataset.sort);
            closeSortOptions();  // Ukryj opcje po dokonaniu wyboru
        });
    });
});