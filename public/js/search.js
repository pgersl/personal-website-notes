const searchContainer = document.querySelector('.search');
const resultTemplate = document.getElementById('search-result-template');
const resultsContainer = document.getElementById('search-results');
const searchBar = document.getElementById('search-input');
const notFoundMessage = document.getElementById('not-found-message');
const searchResultsContainer = document.getElementById('search-results-container');
const searchToggle = document.getElementById('search-toggle');

if (searchToggle) { 
  searchToggle.addEventListener('click', () => {
    searchContainer.style.display = 'flex';
  });
  searchContainer.addEventListener('click', (e) => {
  if (e.target === searchContainer) {
      searchContainer.style.display = 'none';
  }
});
}

let currentResultIndex = -1;

function highlightResult(index) {
  const results = resultsContainer.querySelectorAll('.search-result');
  results.forEach((result, i) => {
      if (i === index) {
          result.classList.add('selected');
      } else {
          result.classList.remove('selected');
      }
  });
}

document.body.addEventListener('keydown', (e) => {
  if (resultsContainer.style.display === 'flex') {
      const results = resultsContainer.querySelectorAll('.search-result');
      if (e.key === 'ArrowDown') {
          e.preventDefault();
          currentResultIndex = Math.min(currentResultIndex + 1, results.length - 1);
          highlightResult(currentResultIndex);
      } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          currentResultIndex = Math.max(currentResultIndex - 1, 0);
          highlightResult(currentResultIndex);
      } else if (e.key === 'Enter' && currentResultIndex !== -1) {
          e.preventDefault();
          const selectedResult = results[currentResultIndex];
          const resultLink = selectedResult.querySelector('.search-result-title');
          window.location.href = resultLink.href;
      }
  }
  if (searchContainer.style.display === 'flex' && e.key === 'Escape') {
      searchContainer.style.display = 'none';
  }
});

function performSearch(searchValue, data) {
  const searchWords = searchValue.split(' ');
  const matchingResults = data.filter(search => {
    return searchWords.every(word => search.title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').includes(word))
  })
  matchingResults.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    
    if (titleA.startsWith(searchValue) && !titleB.startsWith(searchValue)) {
      return -1;
    } else if (!titleA.startsWith(searchValue) && titleB.startsWith(searchValue)) {
      return 1;
    } else {
      return 0;
    }
  });

  resultsContainer.innerHTML = '';

  if (matchingResults.length > 0) {
    matchingResults.forEach(search => {
      const result = resultTemplate.content.cloneNode(true).children[0];
      const resultTitle = result.querySelector('.search-result-title');
  
      resultTitle.textContent = search.title;
      resultTitle.setAttribute('href', search.link);

      resultsContainer.appendChild(result);
    });

    resultsContainer.style.display = 'flex';
    searchResultsContainer.style.display = 'block';
    notFoundMessage.style.display = 'none';
    currentResultIndex = -1;
  } else {
    searchResultsContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    notFoundMessage.style.display = 'block';
  }
}

fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    searchBar.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').trim();
      if (val === '') {
        searchResultsContainer.style.display = 'none';
      } else {
        performSearch(val, data);
      }
    });
  });