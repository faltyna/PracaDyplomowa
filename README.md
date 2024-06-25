### 1. `init.js`
Plik `init.js` jest odpowiedzialny za inicjalizację aplikacji po załadowaniu dokumentu. W nim:
- Pobierana jest lista filmów z serwera i dodawana do strony.
- Generowana jest lista gatunków filmowych, które można filtrować.
- Konfigurowane są zdarzenia kliknięcia dla różnych przycisków (np. przycisk wyszukiwania, przycisk otwierania/zamykania panelu bocznego, przycisk sortowania).

### 2. `helpers.js`
Plik `helpers.js` zawiera funkcję pomocniczą `createMovieItem`, która tworzy elementy HTML dla pojedynczych filmów. W nim:
- Tworzony jest kontener dla filmu zawierający jego plakat, tytuł, rok wydania, gatunek, ocenę i opis.
- Dodawany jest nasłuchiwacz zdarzeń, który po kliknięciu wyświetla rekomendacje filmów.

### 3. `filter.js`
Plik `filter.js` jest odpowiedzialny za filtrowanie filmów na podstawie wyszukiwania i gatunku. W nim:
- `searchMovies` filtruje filmy na podstawie tytułu wpisanego w pole wyszukiwania.
- `filterMoviesByGenre` filtruje filmy na podstawie wybranego gatunku.
- `showAllMovies` przywraca pełną listę filmów.

### 4. `sort.js`
Plik `sort.js` zarządza sortowaniem filmów na różne sposoby. W nim:
- `sortMovies` sortuje filmy na podstawie kryteriów takich jak tytuł, rok wydania i ocena.
- `toggleSortOptions` i `closeSortOptions` zarządzają widocznością opcji sortowania.

### 5. `sidebar.js`
Plik `sidebar.js` zarządza otwieraniem i zamykaniem panelu bocznego. W nim:
- `openNav` otwiera panel boczny.
- `closeNav` zamyka panel boczny.
- Dodawane są nasłuchiwacze zdarzeń do przycisków otwierania i zamykania panelu bocznego.
