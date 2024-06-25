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

### APP.PY 
	1.	Wczytanie danych:
	Dane są wczytywane z pliku CSV, który zawiera informacje o filmach, takie jak tytuł, rok wydania, gatunek, ocena i opis (overview).
	Funkcja load_and_check_csv wczytuje dane i sprawdza strukturę kolumn, aby upewnić się, że wszystkie niezbędne dane są dostępne.
	2.	Przetwarzanie tekstu:
	Kolumna ‘Overview’ (opis filmu) jest wykorzystywana do przetwarzania tekstu za pomocą macierzy TF-IDF (Term Frequency-Inverse Document Frequency).
	TF-IDF jest techniką, która przekształca tekst na wektory liczbowych wartości, co pozwala na analizę tekstu i obliczanie podobieństwa między różnymi dokumentami (w tym przypadku opisami filmów).
	3.	Obliczanie podobieństwa:
	Po przekształceniu opisów filmów na wektory TF-IDF, obliczane jest podobieństwo kosinusowe między wszystkimi filmami za pomocą funkcji linear_kernel z biblioteki scikit-learn.
	Podobieństwo kosinusowe mierzy, jak bardzo dwa wektory są do siebie podobne, co w kontekście rekomendacji filmów oznacza, jak podobne są opisy różnych filmów.
	4.	Generowanie rekomendacji:
	Funkcja get_recommendations pobiera indeks wybranego filmu na podstawie jego tytułu.
	Następnie, obliczane jest podobieństwo tego filmu z wszystkimi innymi filmami.
	Filmy są sortowane według wyników podobieństwa, a najwyżej oceniane (najbardziej podobne) filmy są zwracane jako rekomendacje.
