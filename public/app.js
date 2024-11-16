document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const addProductForm = document.getElementById('addProductForm');
    const productIdInput = document.getElementById('productId');
    const productNameInput = document.getElementById('productName');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');
    const productStockInput = document.getElementById('inStock');

    fetchProducts();

    // Form submission to add a new product
    addProductForm.addEventListener('submit', async (event) => {
        const productId = parseFloat(productIdInput.value);
        const productName = productNameInput.value;
        const productDescription = productDescriptionInput.value;
        const productPrice = parseFloat(productPriceInput.value);
        const productStock = parseFloat(productStockInput.value);

        try {
            const response = await fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    productName,
                    productDescription,
                    price: productPrice,
                    inStock: productStock
                })
            });

            if (response.ok) {
                const newProduct = await response.json();
                console.log('New product added:', newProduct);

                addProductRow(newProduct);
                addProductForm.reset();
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

        row.setAttribute('data-id', product.productId);

        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.productDescription}</td>
            <td>${product.price}</td>
            <td>${product.inStock}</td>
            <td>${new Date(product.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="edit-btn" data-id="${product.productId}">Edit</button>
                <button class="delete-btn" data-id="${product.productId}">Delete</button>
            </td>
        `;

        const deleteBtn = row.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteProduct(product.productId, row));

        const editBtn = row.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editProduct(product, row));
    }

// Function to delete a product
async function deleteProduct(productId, row) {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Product with ID ${productId} deleted successfully`);
            
            location.reload(); // Reload the page
        } else {
            const errorData = await response.json();
            console.error('Failed to delete product:', errorData.message);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}


    // Function to edit a product in the table
    function editProduct(product, row) {
        const originalProduct = { ...product };

        row.innerHTML = `
            <td><input type="text" value="${product.productId}" disabled></td>
            <td><input type="text" value="${product.productName}"></td>
            <td><input type="text" value="${product.productDescription}"></td>
            <td><input type="number" value="${product.price}"></td>
            <td><input type="number" value="${product.inStock}"></td>
            <td>${new Date(product.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="save-btn">Save</button>
                <button class="cancel-btn">Cancel</button>
            </td>
        `;

        const saveBtn = row.querySelector('.save-btn');
        const cancelBtn = row.querySelector('.cancel-btn');

        //save not working
        saveBtn.addEventListener('click', () => saveProduct(product.productId, row));
        cancelBtn.addEventListener('click', () => cancelEdit(row, originalProduct));
    }

    // Save edited product not working?
    async function saveProduct(productId, row) {
        const inputs = row.querySelectorAll('input');
        const updatedProduct = {
            productId: productId,
            productName: inputs[1].value,
            productDescription: inputs[2].value,
            price: parseFloat(inputs[3].value),
            inStock: parseFloat(inputs[4].value),
        };

        try {
            const response = await fetch(`http://localhost:3000/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                const updatedProductData = await response.json();
                console.log('Product updated:', updatedProductData);
                
                row.innerHTML = `
                    <td>${updatedProductData.productId}</td>
                    <td>${updatedProductData.productName}</td>
                    <td>${updatedProductData.productDescription}</td>
                    <td>${updatedProductData.price}</td>
                    <td>${updatedProductData.inStock}</td>
                    <td>${new Date(updatedProductData.createdAt).toLocaleDateString()}</td>
                    <td>
                        <button class="edit-btn" data-id="${updatedProductData.productId}">Edit</button>
                        <button class="delete-btn" data-id="${updatedProductData.productId}">Delete</button>
                    </td>
                `;

            } else {
                const errorData = await response.json();
                console.error('Failed to update product:', errorData.message);
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    // Cancel edit and restore the row
    function cancelEdit(row, originalProduct) {
        row.innerHTML = `
            <td>${originalProduct.productId}</td>
            <td>${originalProduct.productName}</td>
            <td>${originalProduct.productDescription}</td>
            <td>${originalProduct.price}</td>
            <td>${originalProduct.inStock}</td>
            <td>${new Date(originalProduct.createdAt).toLocaleDateString()}</td>
            <td>
                <button class="edit-btn" data-id="${originalProduct.productId}">Edit</button>
                <button class="delete-btn" data-id="${originalProduct.productId}">Delete</button>
            </td>
        `;

        const editBtn = row.querySelector('.edit-btn');
        const deleteBtn = row.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', () => editProduct(originalProduct, row));
        deleteBtn.addEventListener('click', () => deleteProduct(originalProduct.productId, row));
    }
});
