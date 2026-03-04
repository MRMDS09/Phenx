document.addEventListener('DOMContentLoaded', function() {
  const filterForm = document.querySelector('#FacetFiltersForm');
  const productGrid = document.querySelector('.product-grid');

  if (!filterForm) return;

  // Function to fetch and update the grid
  async function updateFilters() {
    const formData = new FormData(filterForm);
    const searchParams = new URLSearchParams(formData).toString();
    const url = `${window.location.pathname}?${searchParams}`;

    // Update the URL in the browser bar
    history.pushState({ url }, '', url);

    // Show a loading state (optional)
    productGrid.style.opacity = '0.5';

    try {
      const response = await fetch(url);
      const text = await response.text();
      const html = new DOMParser().parseFromString(text, 'text/html');

      // Replace the product grid and pagination
      const newGrid = html.querySelector('.product-grid');
      const newPagination = html.querySelector('.pagination');

      if (newGrid) productGrid.innerHTML = newGrid.innerHTML;
      if (newPagination) document.querySelector('.pagination').innerHTML = newPagination.innerHTML;

    } catch (error) {
      console.error('Filter Error:', error);
    } finally {
      productGrid.style.opacity = '1';
    }
  }

  // Listen for checkbox and range changes
  filterForm.addEventListener('change', () => updateFilters());

  // Handle the "Reset" button
  const resetBtn = document.querySelector('.filter-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = window.location.pathname; // Hard reset to clear URL
    });
  }
});