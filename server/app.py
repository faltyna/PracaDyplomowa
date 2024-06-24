from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

# Ścieżka do pliku CSV
csv_file_path = '/Users/natalkafaltyn/Desktop/PRACA/data/imdb_top_1000.csv'

# Wczytanie danych z pliku CSV
df = pd.read_csv(csv_file_path)

# Endpoint do głównej strony
@app.route('/')
def index():
    return render_template('movies.html', movies=df.to_dict('records'))

# Endpoint do pobierania listy filmów jako JSON
@app.route('/movie_list')
def get_movie_list():
    return jsonify({'movies': df.to_dict('records')})

if __name__ == '__main__':
    app.run(debug=True) 