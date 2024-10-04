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

    loadMoreButton.addEventListener('click', () => {
        currentProducts += 6; // Increase the number of products to display by 6
        displayProducts();
    });

    // Initial call to display the first set of products
    displayProducts(); // This will show 0 products initially
});
const flkty = new Flickity('.main-carousel');

function prevSlide() {
    flkty.previous();
}

function nextSlide() {
    flkty.next();
}
