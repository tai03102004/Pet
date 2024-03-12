const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete = confirm("Are you sure you want to delete?");
            if (confirmDelete) {
                const id = button.getAttribute("data-id");
                const action = path  + `/${id}?_method=delete` ;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}