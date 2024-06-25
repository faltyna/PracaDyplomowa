// Funkcja sortująca filmy na podstawie wybranego kryterium
function sortMovies(criteria) {
    const moviesContainer = document.getElementById('movies-container');
    let sortedMovies = [...window.filteredMovies]; // Użyj filteredMovies zamiast moviesData

    // Sortuj filmy na podstawie wybranego kryterium
    switch (criteria) {
        case 'title-asc':
            sortedMovies.sort((a, b) => a.Series_Title.localeCompare(b.Series_Title));
            break;
        case 'title-desc':
            sortedMovies.sort((a, b) => b.Series_Title.localeCompare(a.Series_Title));
            break;
        case 'year-asc':
            sortedMovies.sort((a, b) => a.Released_Year - b.Released_Year);
            break;
        case 'year-desc':
            sortedMovies.sort((a, b) => b.Released_Year - a.Released_Year);
            break;
        case 'rating-asc':
            sortedMovies.sort((a, b) => a.IMDB_Rating - b.IMDB_Rating);
            break;
        case 'rating-desc':
            sortedMovies.sort((a, b) => b.IMDB_Rating - a.IMDB_Rating);
            break;
    }

    // Wyczyść aktualną listę filmów
    moviesContainer.innerHTML = ''; 
    // Dodaj posortowane filmy do kontenera
    sortedMovies.forEach(movie => {
        const movieItem = createMovieItem(movie);
        moviesContainer.appendChild(movieItem);
    });

    // Płynnie przewiń stronę do góry
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funkcja przełączająca wyświetlanie opcji sortowania
function toggleSortOptions() {
    const sortOptions = document.getElementById('sort-options');
    if (sortOptions.style.display === 'block') {
        sortOptions.style.display = 'none';
    } else {
        sortOptions.style.display = 'block';
    }
}

// Funkcja zamykająca opcje sortowania
function closeSortOptions() {
    const sortOptions = document.getElementById('sort-options');
    sortOptions.style.display = 'none';
}