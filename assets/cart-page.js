document.addEventListener('DOMContentLoaded', function() {
  const cartForm = document.querySelector('.cart-form');
  if (!cartForm) return;

  const handleQuantityChange = (event) => {
    const button = event.target.closest('.quantity-selector__button');
    if (!button) return;

    const input = button.parentElement.querySelector('input');
    const lineKey = input.dataset.lineKey;
    const currentQuantity = Number(input.value);
    
    let newQuantity;
    if (button.classList.contains('plus')) {
      newQuantity = currentQuantity + 1;
    } else {
      newQuantity = currentQuantity - 1;
    }
    
    if (lineKey && newQuantity >= 0) {
      updateCart(lineKey, newQuantity);
    }
  };

  const handleRemoveItem = (event) => {
    if (!event.target.classList.contains('cart-item__remove')) return;
    event.preventDefault();
    const lineKey = event.target.closest('.cart-item').dataset.lineKey;
    if (lineKey) {
      updateCart(lineKey, 0);
    }
  };

  const updateCart = (lineKey, quantity) => {
    // Show loading state
    cartForm.classList.add('loading');

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: lineKey,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      // Reload the page to reflect changes.
      // A more advanced implementation could update the DOM without a reload.
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating cart:', error);
      // Remove loading state on error
      cartForm.classList.remove('loading');
    });
  };

  cartForm.addEventListener('click', (event) => {
    handleQuantityChange(event);
    handleRemoveItem(event);
  });
});
