// --- Server Simulation and Sync Logic ---
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Simulate with posts as quotes
let syncing = false;

// Show notification
function showNotification(msg) {
    const note = document.getElementById('notification');
    note.textContent = msg;
    note.style.display = 'block';
    setTimeout(() => { note.style.display = 'none'; }, 4000);
}

// Fetch quotes from server (simulate)
async function fetchServerQuotes() {
    try {
        const res = await fetch(SERVER_URL);
        const data = await res.json();
        // Simulate server quotes as [{text, category}]
        return data.slice(0, 10).map(post => ({ text: post.title, category: 'Server' }));
    } catch (e) {
        showNotification('Failed to fetch from server.');
        return [];
    }
}

// Track the currently selected category filter
let selectedCategory = localStorage.getItem('lastCategoryFilter') || 'all';

// Populate the category dropdown with unique categories from quotes array
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    // Get unique categories
    const categories = [...new Set(quotes.map(q => q.category))];
    // Clear existing options except 'All Categories'
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
    // Restore last selected filter from selectedCategory variable
    categoryFilter.value = selectedCategory;
}

// Filter quotes based on selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    selectedCategory = categoryFilter.value;
    localStorage.setItem('lastCategoryFilter', selectedCategory);
    let filteredQuotes = quotes;
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
    // Show a random quote from filtered list
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        const display = document.getElementById('quoteDisplay');
        display.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
    } else {
        document.getElementById('quoteDisplay').innerHTML = '<p>No quotes in this category.</p>';
    }
}
// Dynamically create and insert the add-quote form
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.id = 'addQuoteFormContainer';
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button id="addQuoteBtn">Add Quote</button>
    `;
    // Insert before the export/import controls
    const exportBtn = document.getElementById('exportQuotes');
    document.body.insertBefore(formDiv, exportBtn);

    // Add event listener for the add quote button
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
}

// Remove static form if present (for idempotency)
const staticForm = document.getElementById('newQuoteText');
if (staticForm) {
    staticForm.parentElement.remove();
}

// Call the function to create the form on page load
createAddQuoteForm();

// Export quotes as a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Attach export function to button
document.getElementById('exportQuotes').addEventListener('click', exportToJsonFile);
// 1. Array to store quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Individuality" }
];
// 2. Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const display = document.getElementById('quoteDisplay');
    display.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
}
// 3. Function to add a new quote from the form
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();
    if (text && category) {
        quotes.push({ text, category });
        textInput.value = '';
        categoryInput.value = '';
        localStorage.setItem('quote', JSON.stringify(quotes)); // Save to local Storage
        populateCategories(); // Update dropdown if new category
        filterQuotes(); // Show filtered/random quote
    } else {
        alert('Please enter both quote text and category.');
    }
}
// 4. Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
// 5. Populate categories and restore filter on page load
populateCategories();
filterQuotes();

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}








