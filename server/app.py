from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Inicjalizacja aplikacji Flask
app = Flask(__name__)
CORS(app)

# Ścieżka do pliku CSV
csv_file_path = '/Users/natalkafaltyn/Desktop/nono/data/imdb_top_1002.csv'

# Funkcja do wczytywania danych z pliku CSV i sprawdzania kolumn
def load_and_check_csv(file_path):
    try:
        # Wczytaj tylko pierwsze 10 wierszy, aby sprawdzić strukturę pliku
        df = pd.read_csv(file_path, nrows=10, delimiter=';', on_bad_lines='skip')
        print("Kolumny w pliku CSV:", df.columns)
        print("Przykładowe wiersze:")
        print(df.head())
        return df.columns
    except pd.errors.ParserError as e:
        print(f"Błąd parsowania pliku CSV: {e}")
        return []

# Sprawdź kolumny w pliku CSV
columns = load_and_check_csv(csv_file_path)

# Wczytanie całego pliku CSV z pominięciem błędnych linii
try:
    df = pd.read_csv(csv_file_path, delimiter=';', on_bad_lines='skip')
except pd.errors.ParserError as e:
    print(f"Błąd parsowania pliku CSV: {e}")
    df = pd.DataFrame()  # W razie błędu, utwórz pustą DataFrame

# Sprawdź, czy kolumna 'Overview' istnieje
if 'Overview' in columns:
    df['Overview'] = df['Overview'].fillna('')  # Wypełnij brakujące wartości
else:
    print("Kolumna 'Overview' nie istnieje w pliku CSV")
    # Wyjście z programu, jeśli kolumna 'Overview' nie istnieje
    exit()

# Utwórz macierz TF-IDF na podstawie kolumny 'Overview'
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['Overview'])

# Obliczanie podobieństwa kosinusowego między wszystkimi filmami
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Funkcja do rekomendacji filmów
def get_recommendations(title, cosine_sim=cosine_sim):
    # Pobierz indeks filmu na podstawie tytułu
    idx = df[df['Series_Title'] == title].index[0]

    # Pobierz wyniki podobieństwa kosinusowego dla tego filmu z wszystkimi innymi filmami
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Posortuj filmy na podstawie wyników podobieństwa
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Pobierz indeksy 10 najbardziej podobnych filmów
    sim_scores = sim_scores[1:13]

    # Pobierz indeksy filmów
    movie_indices = [i[0] for i in sim_scores]

    # Zwróć tytuły 10 najbardziej podobnych filmów
    return df.iloc[movie_indices].to_dict('records')

# Endpoint do pobierania listy filmów jako JSON
@app.route('/movie_list')
def get_movie_list():
    return jsonify({'movies': df.to_dict('records')})

# Endpoint do rekomendacji filmów
@app.route('/recommend', methods=['GET'])
def recommend():
    title = request.args.get('title')
    recommendations = get_recommendations(title)
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True, port=5000)