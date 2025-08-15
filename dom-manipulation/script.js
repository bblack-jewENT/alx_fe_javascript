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
        showRandomQuote(); // Show the new quote or a random one
    } else {
        alert('Please enter both quote text and category.');
    }
}
// 4. Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

