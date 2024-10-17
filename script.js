document.addEventListener('DOMContentLoaded', () => {
    let totalFetchedProducts = 0; // Track total displayed products
    const productsPerPage = 12; // Number of products to load at once
    const productGrid = document.querySelector('.just-for-you-grid');
    const loadMoreButton = document.querySelector('.load-more-button');
    let allProducts = []; // Store all products fetched at once

    //  to fetch all products from the API
    const fetchAllProducts = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            allProducts = await res.json(); // Fetch all products once

            console.log('Fetched all products:', allProducts);

            // Initially display the first set of products
            displayProducts();
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Function to display products in the grid
    // yehn all product is array ha jahan sary products han
    const displayProducts = () => {
        const productsToShow = allProducts.slice(totalFetchedProducts, totalFetchedProducts + productsPerPage);

        // If no more products, hide the button
        if (productsToShow.length === 0) {
            console.log('No more products to load');
            loadMoreButton.style.display = 'none';
            return;
        }

        // Loop through the fetched products and display them
        productsToShow.forEach(product => {
            const productHTML = `
                <div class="product">
                    <img src="${product.image}" alt="${product.title}">
                    <a href="product.html?id=${product.id}">
                        <h3>${product.title.substring(0, 30)}...</h3>
                    </a>
                    <p class="price">Rs. ${product.price} <span class="discount">-${Math.floor(Math.random() * 30) + 50}%</span></p>
                    <span class="rating">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        (${product.rating.count})
                    </span>
                </div>
            `;
            productGrid.innerHTML += productHTML;
        });

        // Update the total number of displayed products
        totalFetchedProducts += productsPerPage;
    };

    // Load more button click event
    loadMoreButton.addEventListener('click', () => {
        console.log('Load More button clicked');
        displayProducts(); // Display the next set of products
    });

    // Fetch and display the first set of products
    fetchAllProducts();
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

// Variables for load more functionality
let totalFetchedProducts = 0; // Track total displayed products
const productsPerPage = 12; // Number of products to load at once
let allProducts = []; // Store all fetched products
const loadMoreButton = document.querySelector('.load-more-button'); // Load more button

// Function to fetch data from API and initialize product loading
const fetchData = async () => {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        allProducts = data; // Store all fetched products

        displayProducts(); // Display the first 12 products
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Function to display the next set of products
const displayProducts = () => {
    const productGrid = document.querySelector(".just-for-you-grid");

    // Get the next set of products to display
    const productsToShow = allProducts.slice(totalFetchedProducts, totalFetchedProducts + productsPerPage);

    // Append the products to the grid
    productsToShow.forEach(product => {
        const productHTML = `
            <a href="product.html?id=${product.id}" class="just-for-you-item" style="text-decoration: none; color: inherit;">
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title.substring(0, 30)}...</p>
                <span class="price">Rs.${product.price}</span>
                <span class="discount">-${Math.floor(Math.random() * 30) + 50}%</span>
                <span class="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    (${product.rating.count})
                </span>
            </a>
        `;
        productGrid.innerHTML += productHTML;
    });

    // Update the total number of displayed products
    totalFetchedProducts += productsPerPage;

    // Hide the button if all products are displayed
    if (totalFetchedProducts >= allProducts.length) {
        loadMoreButton.style.display = 'none'; // Hide the button when all products are loaded
    }
};

// Fetch data and display the first set of products when the page loads
fetchData();








document.addEventListener('DOMContentLoaded', async () => {
    const categoriesGrid = document.querySelector('.categories-grid');

    // Manually define extra categories with images
    const extraCategories = [
        { name: 'Bags', image: 'bag.webp' },
        { name: 'Watches', image: 'watch.webp' },
        { name: 'Mobiles', image: 'mobile.webp' },
        { name: 'Toys', image: 'building.webp' },
        { name: 'cady', image: 'cady.webp' },
        { name: 'Bulb', image: 'bulb.webp' },
        { name: 'Sunglasses', image: 'sunglasses.jfif' },
        { name: 'Cat', image: 'cat.webp' },
        { name: 'Tote', image: 'tote.webp' },
        { name: 'Paint', image: 'paint.webp' },
        { name: 'Dining Set', image: 'set.webp' },
        { name: 'Wire', image: 'wire.webp' }
    ];
    

    // Function to fetch and display all categories with images
    const fetchAndDisplayCategories = async () => {
        try {
            // Fetch categories from the API
            const categoriesRes = await fetch('https://fakestoreapi.com/products/categories');
            if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
            const apiCategories = await categoriesRes.json();

            // Fetch all products from the API
            const productsRes = await fetch('https://fakestoreapi.com/products');
            if (!productsRes.ok) throw new Error('Failed to fetch products');
            const products = await productsRes.json();

            // Prepare API categories with their product images
            const formattedApiCategories = apiCategories.map(category => {
                const productInCategory = products.find(prod => prod.category === category);
                return {
                    name: category.charAt(0).toUpperCase() + category.slice(1),
                    image: productInCategory ? productInCategory.image : 'default.webp'
                };
            });

            // Combine API categories with custom categories
            const allCategories = [...formattedApiCategories, ...extraCategories];

            // Display all the categories on the page
            displayCategories(allCategories);
        } catch (error) {
            console.error('Error fetching data:', error);
            categoriesGrid.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
        }
    };

    // Function to render the categories in the grid
    const displayCategories = (categories) => {
        categoriesGrid.innerHTML = ''; // Clear the grid before rendering

        categories.forEach(category => {
            const categoryHTML = `
                <div class="category-item">
                    <img src="${category.image}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `;
            categoriesGrid.innerHTML += categoryHTML;
        });
    };

    // Fetch and display categories on page load
    fetchAndDisplayCategories();
});
