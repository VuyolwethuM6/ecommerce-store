document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.getElementById('home');
    const productsSection = document.getElementById('products');
    const cartSection = document.getElementById('cart');
    const productsList = document.getElementById('products-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const homeLink = document.getElementById('home-link');
    const productsLink = document.getElementById('products-link');
    const viewMoreButton = document.querySelector('.view-more-button');

    let cart = [];
    let allProducts = []; // Store all products for later use

    const loadProducts = async () => {
        try {
            const response = await fetch('/api/products');
            allProducts = await response.json();
            renderFeaturedProducts(allProducts);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const renderFeaturedProducts = (products) => {
        if (!productsList) return; // Check if productsList exists
        productsList.innerHTML = '';
        const featuredProducts = products.slice(0, 6);
        featuredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-card';
            const productImage = product.ImageURL ? product.ImageURL : 'product.png';
            const truncatedDescription = product.Description.length > 100 ? product.Description.substring(0, 100) + '...' : product.Description;
            productDiv.innerHTML = `
                <img src="${productImage}" alt="${product['Product Name']}">
                <h3>${product['Product Name']}</h3>
                <p>${truncatedDescription}</p>
                <p>$${product.Price}</p>
                <button data-id="${product['Uniq Id']}">Add to Cart</button>
            `;
            productsList.appendChild(productDiv);
        });
    };

    const renderAllProducts = () => {
        if (!productsList) return; // Check if productsList exists
        productsList.innerHTML = '';
        allProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-card';
            const productImage = './product.jpg';
            productDiv.innerHTML = `
                <img src="${productImage}" alt="${product['Product Name']}">
                <h3>${product['Product Name']}</h3>
                <p>${product.Description}</p>
                <p>$${product.Price}</p>
                <button data-id="${product['Uniq Id']}">Add to Cart</button>
            `;
            productsList.appendChild(productDiv);
        });
    };

    const updateCart = () => {
        if (!cartItems || !cartTotal || !cartCount) return; // Check if cartItems, cartTotal, and cartCount exist
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.Price.replace('$', '')) * item.quantity; // Adjusted to '$' for consistency
            const li = document.createElement('li');
            li.innerHTML = `${item['Product Name']} x${item.quantity} - $${(parseFloat(item.Price.replace('$', '')) * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
        });
        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
        if (cartCount) cartCount.innerText = cart.length;
    };

    productsList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = e.target.getAttribute('data-id');
            const product = allProducts.find(p => p['Uniq Id'] === productId);
            if (product) {
                const cartItem = cart.find(item => item['Uniq Id'] === productId);
                if (cartItem) {
                    cartItem.quantity += 1;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCart();
            } else {
                console.log('Product not found:', productId);
            }
        }
    });

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            if (homeSection) homeSection.classList.remove('active');
            if (productsSection) productsSection.classList.remove('active');
            if (cartSection) {
                cartSection.classList.add('active');
                updateCart(); // Update cart content when displaying cart
            }
            updateNavLinks('cart');
        });
    }

    // if (homeLink) {
    //     homeLink.addEventListener('click', () => {
    //         if (homeSection) homeSection.classList.add('active');
    //         if (productsSection) productsSection.classList.remove('active');
    //         if (cartSection) cartSection.classList.remove('active');
    //         updateNavLinks('home');
    //     });
    // }

    // if (productsLink) {
    //     productsLink.addEventListener('click', () => {
    //         if (homeSection) homeSection.classList.remove('active');
    //         if (productsSection) productsSection.classList.add('active');
    //         if (cartSection) cartSection.classList.remove('active');
    //         renderAllProducts();
    //         updateNavLinks('products');
    //     });
    // }

    // if (viewMoreButton) {
    //     viewMoreButton.addEventListener('click', () => {
    //         if (homeSection) homeSection.classList.remove('active');
    //         if (productsSection) productsSection.classList.add('active');
    //         if (cartSection) cartSection.classList.remove('active');
    //         renderAllProducts();
    //         updateNavLinks('products');
    //     });
    // }

    // const updateNavLinks = (activeSection) => {
    //     if (homeLink) homeLink.classList.toggle('active', activeSection === 'home');
    //     if (productsLink) productsLink.classList.toggle('active', activeSection === 'products');
    // };

    loadProducts();
});
