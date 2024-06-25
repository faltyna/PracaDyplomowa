// Funkcja wyszukująca filmy na podstawie wpisanego tytułu
function searchMovies() {
    // Pobierz wartość z pola wyszukiwania i zamień ją na małe litery
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';  // Wyczyść aktualną listę filmów

    // Filtruj filmy na podstawie wpisanego tytułu
    window.filteredMovies = window.moviesData.filter(movie =>
        movie.Series_Title.toLowerCase().includes(searchInput)
    );

    // Wyświetl przefiltrowane filmy
    if (window.filteredMovies && window.filteredMovies.length > 0) {
        window.filteredMovies.forEach(movie => {
            const movieItem = createMovieItem(movie);
            moviesContainer.appendChild(movieItem);
        });
    } else {
        moviesContainer.textContent = 'No movies found.';
    }

    // Płynnie przewiń stronę do góry
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funkcja filtrująca filmy na podstawie wybranego gatunku
function filterMoviesByGenre(genre) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';  // Wyczyść aktualną listę filmów

    // Filtruj filmy na podstawie wybranego gatunku
    window.filteredMovies = window.moviesData.filter(movie =>
        movie.Genre.toLowerCase().includes(genre.toLowerCase())
    );

    // Wyświetl przefiltrowane filmy
    if (window.filteredMovies && window.filteredMovies.length > 0) {
        window.filteredMovies.forEach(movie => {
            const movieItem = createMovieItem(movie);
            moviesContainer.appendChild(movieItem);
        });
    } else {
        moviesContainer.textContent = 'No movies found.';
    }

    // Zamknij panel boczny po wybraniu gatunku
    closeNav();
    // Płynnie przewiń stronę do góry
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funkcja wyświetlająca wszystkie filmy
function showAllMovies() {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';  // Wyczyść aktualną listę filmów

    // Resetuj do wszystkich filmów
    window.filteredMovies = [...window.moviesData];
    window.filteredMovies.forEach(movie => {
        const movieItem = createMovieItem(movie);
        moviesContainer.appendChild(movieItem);
    });

    // Płynnie przewiń stronę do góry
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funkcja wyświetlająca rekomendacje filmów po kliknięciu na tytuł
function showRecommendations(title) {
    // Pokaż modalne okienko z informacją
    showModal(`After watching ${title}, we recommend:`);
    fetch(`http://127.0.0.1:5000/recommend?title=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => {
            const moviesContainer = document.getElementById('movies-container');
            moviesContainer.innerHTML = '';  // Wyczyść aktualną listę filmów
            const recommendations = data.recommendations;

            // Wyświetl rekomendowane filmy
            if (recommendations && recommendations.length > 0) {
                recommendations.slice(0, 10).forEach(movie => {
                    const movieItem = createMovieItem(movie);
                    moviesContainer.appendChild(movieItem);
                });
            } else {
                moviesContainer.textContent = 'No recommendations found.';
            }

            // Płynnie przewiń stronę do góry
            window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch recommendations.');
        });
}

// Funkcja wyświetlająca modalne okienko z tekstem
function showModal(text) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.textContent = text;
    modal.classList.add('show');
    modal.classList.remove('hide');
    setTimeout(() => {
        modal.classList.add('hide');
        setTimeout(() => {
            modal.classList.remove('show');
        }, 500); // Opóźnienie, aby dopasować do efektu fade-out
    }, 3000); // Pokaż przez 3 sekundy przed rozpoczęciem efektu fade-out
}