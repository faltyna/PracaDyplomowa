// Funkcja otwierająca panel boczny
function openNav() {
    document.getElementById('side-panel').style.width = '200px';  // Ustawiono maksymalną szerokość
}

// Funkcja zamykająca panel boczny
function closeNav() {
    document.getElementById('side-panel').style.width = '0';
}

// Obsługa zdarzenia kliknięcia przycisku otwierającego/zamykającego panel boczny
document.getElementById('open-btn').addEventListener('click', () => {
    const sidePanel = document.getElementById('side-panel');
    if (sidePanel.style.width === '200px') {  // Sprawdź, czy panel boczny jest otwarty
        closeNav();  // Zamknij panel boczny
    } else {
        openNav();  // Otwórz panel boczny
        closeSortOptions(); // Ukryj opcje sortowania, gdy panel gatunków jest otwarty
    }
});

// Obsługa zdarzenia kliknięcia przycisku zamykającego panel boczny
document.getElementById('close-btn').addEventListener('click', closeNav);

// Funkcja zamykająca opcje sortowania
function closeSortOptions() {
    const sortOptions = document.getElementById('sort-options');
    sortOptions.style.display = 'none';
}