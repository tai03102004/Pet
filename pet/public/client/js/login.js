const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () =>
    container.classList.add('right-panel-active'));

signInButton.addEventListener('click', () =>
    container.classList.remove('right-panel-active'));

    const logIn = document.querySelector(".overlay-container");
    if (logIn){
        const buttonSignUp = logIn.querySelector("button.ghost#signUp ");
        if (buttonSignUp){
            buttonSignUp.addEventListener("click", () => {
                logIn.classList.add("fade-out");
                setTimeout(() => {
                    let url = new URL(window.location.href);
                    if (url.pathname === "/auth/login" ){
                        url.pathname = "/auth/signup";
                    }
                    window.location.href = url.href;
                }, 300);  // Thời gian chờ (ms) trước khi chuyển trang
            });
            
    
        }
    }

    // Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
    const closeAlert = showAlert.querySelector("[close-alert]");

  // Hàm để ẩn đi cảnh báo
    const hideAlert = () => {
        showAlert.classList.add("alert-hidden");
    };

  // Thiết lập timeout để ẩn đi cảnh báo sau khoảng thời gian đã cho
    const timeoutId = setTimeout(hideAlert, time);

  // Xử lý sự kiện khi click vào nút đóng (dấu X)
    closeAlert.addEventListener("click", () => {
        // Hủy timeout để ngăn việc ẩn đi cảnh báo
        clearTimeout(timeoutId);
        // Gọi hàm để ẩn đi cảnh báo
        hideAlert();
    });
}

// End Show Alert


// an hien con amt

const input1 = document.querySelector(".input1");
const eyeOpen = document.querySelector(".eye-open");
const eyeClose = document.querySelector(".eye-close");

eyeOpen.addEventListener("click", function(){
    eyeOpen.classList.add("hidden");
    input1.setAttribute("type","password");
    eyeClose.classList.remove("hidden");
});

eyeClose.addEventListener("click", function(){
    eyeOpen.classList.remove("hidden");
    eyeClose.classList.add("hidden");
    input1.setAttribute("type","text");
})