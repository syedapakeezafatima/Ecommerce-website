document.addEventListener('DOMContentLoaded', () => {
    let currentProducts = 0; // Start with 0 products displayed
    const allProducts = document.querySelectorAll('.product');
    const loadMoreButton = document.querySelector('.load-more-button');

    function displayProducts() {
        allProducts.forEach((product, index) => {
            if (index < currentProducts) {
                product.style.display = 'block'; // Show product
            } else {
                product.style.display = 'none'; // Hide product
            }
        });

        // Hide the button if all products are displayed
        if (currentProducts >= allProducts.length) {
            loadMoreButton.style.display = 'none';
        }
    }
