document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.product-page');
  if (!section) return;

  // Media Gallery Logic
  const mainImage = document.getElementById('main-product-image-' + section.dataset.sectionId);
  const thumbnailLinks = section.querySelectorAll('.thumbnail-link');

  if (mainImage && thumbnailLinks.length > 0) {
    thumbnailLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();

        // Update main image
        const newSrc = this.href;
        mainImage.src = newSrc;
        mainImage.alt = this.querySelector('.thumbnail-image').alt;

        // Update active thumbnail
        thumbnailLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Set the first thumbnail as active by default
    thumbnailLinks[0].classList.add('active');
  }

  // --- Product Variant Selection Logic ---
  //
  // This is where the script to handle variant changes would go.
  // It needs to:
  // 1. Listen for changes on the variant selector (e.g., dropdowns).
  // 2. Fetch the corresponding variant data from the product JSON.
  // 3. Update the price display.
  // 4. Update the "Add to Cart" button (e.g., text to "Sold Out" and disable it).
  // 5. Update the URL with the selected variant's ID.
  // 6. Potentially update the main product image if the variant has a specific image.
  //
  // Example:
  // const variantPicker = document.querySelector('.variant-picker__select');
  // variantPicker.addEventListener('change', function() {
  //   const selectedVariantId = this.value;
  //   // ... find variant data and update the DOM
  // });

});
