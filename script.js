document.addEventListener('DOMContentLoaded', () => {
    let totalFetchedProducts = 0; // Track total displayed products
    const productsPerPage = 12; // Number of products to load at once
    const productGrid = document.querySelector('.just-for-you-grid');
    const loadMoreButton = document.querySelector('.load-more-button');
    let allProducts = []; // Store all products fetched at once

    // Fetch all products from the API
    const fetchAllProducts = async () => {
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            if (!res.ok) throw new Error('Failed to fetch products');
            allProducts = await res.json(); // Store all fetched products

            console.log('Fetched all products:', allProducts); // Debugging

            // Display the first set of products
            displayProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Function to display products in the grid
    const displayProducts = () => {
        // Get the next set of products to display
        const productsToShow = allProducts.slice(totalFetchedProducts, totalFetchedProducts + productsPerPage);

        // Append the products to the grid
        productsToShow.forEach(product => {
            const starsHTML = getStarsHTML(product.rating.rate); // Generate stars based on rating

            const productHTML = `
                <a href="product.html?id=${product.id}" class="just-for-you-item" style="text-decoration: none; color: inherit;">
                    <img src="${product.image}" alt="${product.title}">
                    <p>${product.title.substring(0, 30)}...</p>
                    <span class="price">Rs. ${product.price}</span>
                    <span class="discount">-${Math.floor(Math.random() * 30) + 50}%</span>
                    <div class="rating">
                        ${starsHTML} 
                        <span style="color: black;">(${product.rating.count})</span>

                    </div>
                </a>
            `;
            productGrid.innerHTML += productHTML;
        });

        // Update the total number of displayed products
        totalFetchedProducts += productsPerPage;

        // Hide the button if all products are displayed
        if (totalFetchedProducts >= allProducts.length) {
            loadMoreButton.style.display = 'none'; // Hide button
        }
    };

    // Function to generate star HTML based on rating value
    const getStarsHTML = (rating) => {
        const fullStars = Math.floor(rating); // Full stars
        const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if rating has a decimal >= 0.5
        const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

        let starsHTML = '';

        // Generate full star icons
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fa fa-star" style="color: yellow;"></i>';
        }

        // Generate half star icon (if applicable)
        if (halfStar) {
            starsHTML += '<i class="fa fa-star-half-alt" style="color: yellow;"></i>';
        }

        // Generate empty star icons
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="fa fa-regular fa-star" style="color: yellow;"></i>';
        }

        return starsHTML;
    };

    // Event listener for the "Load More" button
    loadMoreButton.addEventListener('click', () => {
        console.log('Load More button clicked'); // Debugging
        displayProducts(); // Display the next set of products
    });

    // Fetch products when the page loads
    fetchAllProducts();
});







document.addEventListener('DOMContentLoaded', async () => {
    const categoriesGrid = document.querySelector('.categories-grid');
    const productsGrid = document.querySelector('.just-for-you-grid');

    const extraCategories = [
        { name: 'Bags', image: 'bag.webp' },
        { name: 'Watches', image: 'watch.webp' },
        { name: 'Mobiles', image: 'mobile.webp' },
        { name: 'Toys', image: 'building.webp' },
        { name: 'Cady', image: 'cady.webp' },
        { name: 'Bulb', image: 'bulb.webp' },
        { name: 'Sunglasses', image: 'sunglasses.jfif' },
        { name: 'Cat', image: 'cat.webp' },
        { name: 'Tote', image: 'tote.webp' },
        { name: 'Paint', image: 'paint.webp' },
        { name: 'Dining Set', image: 'set.webp' },
        { name: 'Wire', image: 'wire.webp' }
    ];

    const fetchAndDisplayCategories = async () => {
        try {
            const categoriesRes = await fetch('https://fakestoreapi.com/products/categories');
            if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
            const apiCategories = await categoriesRes.json();

            const productsRes = await fetch('https://fakestoreapi.com/products');
            if (!productsRes.ok) throw new Error('Failed to fetch products');
            const products = await productsRes.json();

            const formattedApiCategories = apiCategories.map(category => {
                const productInCategory = products.find(prod => prod.category === category);
                return {
                    name: category.charAt(0).toUpperCase() + category.slice(1),
                    image: productInCategory ? productInCategory.image : 'default.webp'
                };
            });

            const allCategories = [...formattedApiCategories, ...extraCategories];
            displayCategories(allCategories);
        } catch (error) {
            console.error('Error fetching data:', error);
            categoriesGrid.innerHTML = '<p>Failed to load categories. Please try again later.</p>';
        }
    };

    const displayCategories = (categories) => {
        categoriesGrid.innerHTML = '';

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('category-item');
            categoryElement.innerHTML = `
                <img src="${category.image}" alt="${category.name}">
                <p>${category.name}</p>
            `;

            // Attach click event to fetch products by category
            categoryElement.addEventListener('click', () => {
                fetchProductsByCategory(category.name.toLowerCase());
            });

            categoriesGrid.appendChild(categoryElement);
        });
    };

    const fetchProductsByCategory = async (category) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productsGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    };

    const displayProducts = (products) => {
        productsGrid.innerHTML = '';

        products.forEach(product => {
            const productHTML = `
                <div class="just-for-you-item">
                    <img src="${product.image}" alt="${product.title}">
                    <p>${product.title}</p>
                    <p class="price">$${product.price}</p>
                    <div class="rating" style="color: yellow; font-size: 16px">${'★'.repeat(Math.round(product.rating.rate))}</div>
                </div>
            `;
            productsGrid.innerHTML += productHTML;
        });
    };

    // Fetch and display categories on page load
    fetchAndDisplayCategories();
});




















































































































document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const loginLink = document.getElementById('loginLink');
    const modal = document.getElementById('loginModal');
    const modalBackground = document.getElementById('modalBackground');
    const closeModal = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    // Open modal on login link click
    loginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        modal.classList.remove('hidden');
        modalBackground.classList.remove('hidden');
    });

    // Close modal when clicking close button or background
    closeModal.addEventListener('click', closeModalFunction);
    modalBackground.addEventListener('click', closeModalFunction);

    function closeModalFunction() {
        modal.classList.add('hidden');
        modalBackground.classList.add('hidden');
    }

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const json = await res.json();

            if (json.token) {
                alert('Login successful!');
                console.log('Token:', json.token);
                closeModalFunction(); // Close modal after successful login
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});












