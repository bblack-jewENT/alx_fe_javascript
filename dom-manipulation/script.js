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
