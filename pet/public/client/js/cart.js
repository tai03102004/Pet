// Update Product is Cart

const inputsQuantity = document.querySelectorAll("input[name='quantity']");

if (inputsQuantity.length > 0) {
    inputsQuantity.forEach(item => {
        item.addEventListener("change",(e) => {
            const productId = item.getAttribute("product-id");
            const quantity = item.value;
            const intValue = parseInt(quantity);
            if (intValue > 0) {
                window.location.href = `/cart/update/${productId}/${quantity}`;
            }
        })
    })
}

// End Update Product is Cart