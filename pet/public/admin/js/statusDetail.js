// Change-Status Detail

const statusDetail = document.querySelector('.inner-status');
if (statusDetail) {
    const statusProductDetail = document.querySelector('.inner-product-status');
    if (statusProductDetail) {
        const formChangeStaus = document.querySelector('#form-change-status');
        const path = formChangeStaus.getAttribute('data-path');
        const buttonStatus = document.querySelector('[button-change-status]');
        if (buttonStatus) {
            buttonStatus.addEventListener('click', () => {
                const id = buttonStatus.getAttribute("data-id");
                const dataStatus = buttonStatus.getAttribute("data-status");
                const status = dataStatus == "active" ? "inactive" : "active";
                const action = path + `/${status}/${id}?_method=PATCH`;
                formChangeStaus.action = action;
                formChangeStaus.submit();
            });
        }
    }
}
// End Change-Status Detail