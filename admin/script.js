// Basic script untuk tes fetch dari Google Sheets API
const fetchBtn = document.getElementById('fetchData');
const output = document.getElementById('output');

fetchBtn.addEventListener('click', () => {
  fetch('https://script.google.com/macros/s/AKfycbzAXJg4eg6LLyQo6erAh6vg1bntkB3-fVHKcbDu39rGYddxtSdBf2eFFjCaNs8uFRFRmQ/exec')
    .then(response => response.json())
    .then(data => {
      output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    })
    .catch(err => {
      output.innerHTML = `Error: ${err}`;
    });
});