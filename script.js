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
        // If currentProducts is 0, show all products
        if (currentProducts === 0) {
            currentProducts = allProducts.length; // Set to total products
        } else {
            currentProducts += 6; // Increase the number of products to display by 6
        }
        displayProducts();
        
        // Move the newly displayed products to the bottom (optional)
        const displayedProducts = Array.from(allProducts).slice(0, currentProducts);
        displayedProducts.forEach(product => {
            product.parentNode.appendChild(product); // Move product to the end of the parent
        });
    });

    // Initial call to display the first set of products
    displayProducts(); // This will show 0 products initially
});
// Get the product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Example product data (replace with your own API call or database query)
const products = [
    { id: 1, name: "Product 1", price: 19.99, description: "Description for Product 1" },
    { id: 2, name: "Product 2", price: 29.99, description: "Description for Product 2" },
    // Add more products here
];

// Find the product by ID
const product = products.find(p => p.id == productId);

// Update the HTML with product details
if (product) {
    document.querySelector('.product-name').textContent = product.name;
    document.querySelector('.product-price').textContent = `$${product.price}`;
    document.querySelector('.product-description').textContent = product.description;
}




