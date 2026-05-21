window.addEventListener("load", (event) => {
  // If a user clicks on the search button in the top nav, open the search modal
  let button = document.getElementById('site-search-button');
  button.addEventListener("click", (event) => {
    let searchable = document.getElementById('site-search');
    let bodyTag = document.body;
    let input = searchable.getElementsByClassName('pagefind-ui__search-input');
    
    // Add classes to make the search form + results visible, and block scrolling on background
    searchable.classList.add('header-search-visible');
    bodyTag.classList.add('overflow-hidden');

    // Switch the focus to the search input — type at once to search
    if (input.length) {
      input.item(0).focus();
    }

    // If the user clicks outside the search box + results, close the search modal
    searchable.addEventListener("click", (event) => {
      if (event.target == searchable) {
        searchable.classList.remove('header-search-visible');
        bodyTag.classList.remove('overflow-hidden');
      }
    });

    // If the user clicks the escape key, close the search modal
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        searchable.classList.remove('header-search-visible');
        bodyTag.classList.remove('overflow-hidden');
      }
    });
  });
});

window.addEventListener('DOMContentLoaded', (event) => {
  new PagefindUI({
    element: "#search",
    showImages: false,
    showSubResults: true
  });
});