// Change Status (Thay đổi trang thái 1 sản phẩm)

const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click",() =>  {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            // formChangeStatus.setAttribute("action", action);
            formChangeStatus.submit(); // gửi yêu cầu đến http và action sẽ được gán theo yêu cầu
        })
    })
}

// End Change Status