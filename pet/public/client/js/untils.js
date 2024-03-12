const item = document.querySelectorAll('.section-2__wrap');
if (item) {
    const prices = document.querySelectorAll(".section-2__price");
    console.log(prices);
    if (prices.length > 0) {
        for (const price of prices) {
            const numberPrice = price.innerText.trim(); // Loại bỏ khoảng trắng thừa
            const formattedPrice = numberPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            price.innerHTML = `${formattedPrice} <span>đ</span>`;
        }
    }
}
