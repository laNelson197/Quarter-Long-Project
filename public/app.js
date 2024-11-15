document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const addProductForm = document.getElementById('addProductForm');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');
    const productStockInput = document.getElementById('inStock');

    // Fetch and display products when page loads
    fetchProducts();

    // Form submission to add a new product
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        // Extract values from the form inputs
        const productId = parseFloat(productIdInput.value);
        const productName = productNameInput.value;
        const productDescription = productDescriptionInput.value;
        const productPrice = parseFloat(productPriceInput.value);
        const productStock = parseFloat(productStockInput.value);

        // Log the form data (for debugging)
        console.log({
            productId: productId,
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productStock: productStock
        });

        // Send POST request to add a new product
        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productId,
                    productName: productName,
                    productDescription: productDescription,
                    price: productPrice,
                    inStock: productStock
                })
            });

            // Check if the response is OK
            if (response.ok) {
                const newProduct = await response.json();
                console.log('New product added:', newProduct);
                addProductRow(newProduct); // Update the table with the new product
                addProductForm.reset(); // Clear the form
            } else {
                const errorData = await response.json();
                console.error('Failed to add product:', errorData.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    // Function to fetch all products from the API
    async function fetchProducts() {
        const url = "http://localhost:3000/products";
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                const products = data.products;
                products.forEach(product => {
                    addProductRow(product);
                });
            } else {
                console.error('Failed to fetch products:', data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to create a new row in the table for a product
    function addProductRow(product) {
        const row = productTableBody.insertRow();

        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productDescription}</td>
            <td>${product.price}</td>
            <td>${product.inStock}</td>
            <td>${product.createdAt}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
    }
});
