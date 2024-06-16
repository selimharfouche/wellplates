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
        document.getElementById('results').innerHTML = 'Error loading the database.';
        return;
    }

    const results = database.wellplates.filter(wellplate => 
        wellplate.name.toLowerCase().includes(searchInput) ||
        wellplate.brand.toLowerCase().includes(searchInput)
    );

    displayResults(results);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
        return;
    }

    const resultsList = document.createElement('ul');
    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = `${result.name} - ${result.brand} (${result.material}, ${result.number_of_wells} wells)`;
        resultsList.appendChild(listItem);
    });

    resultsContainer.appendChild(resultsList);
}
