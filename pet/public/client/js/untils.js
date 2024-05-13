const item = document.querySelectorAll('.section-2__wrap');
if (item) {
    const prices = document.querySelectorAll(".section-2__price");
    if (prices.length > 0) {
        for (const price of prices) {
            const numberPrice = price.innerText.trim(); // Loại bỏ khoảng trắng thừa
            const formattedPrice = numberPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            price.innerHTML = `${formattedPrice} <span>đ</span>`;
        }
    }
}

const prices = document.querySelector('.product-info__price');
if (prices) {
    const numberPrice = prices.innerText.trim(); // Loại bỏ khoảng trắng thừa
    const formattedPrice = numberPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    prices.innerHTML = `${formattedPrice} <span>đ</span>`;
}


