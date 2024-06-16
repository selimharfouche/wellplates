async function fetchDatabase() {
    try {
        const response = await fetch('database.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching the database:', error);
        return null;
    }
}

async function searchDatabase() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const database = await fetchDatabase();

    if (!database) {
        document.getElementById('results').innerHTML = '<div class="alert alert-danger">Error loading the database.</div>';
        return;
    }

    const results = database.wellplates.filter(wellplate => 
        wellplate.name.toLowerCase().includes(searchInput) ||
        wellplate.brand.toLowerCase().includes(searchInput)
    );

    displayResults(results, searchInput);
}

function displayResults(results, searchTerm) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="alert alert-warning">No results found.</div>';
        return;
    }

    const resultsList = document.createElement('ul');
    resultsList.classList.add('list-group');
    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        const highlightedName = highlightText(result.name, searchTerm);
        const highlightedBrand = highlightText(result.brand, searchTerm);
        listItem.innerHTML = `${highlightedName} - ${highlightedBrand} (${result.material}, ${result.number_of_wells} wells)`;
        resultsList.appendChild(listItem);
    });

    resultsContainer.appendChild(resultsList);
}

function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
}
