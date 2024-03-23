"use strict";

var signUpButton = document.getElementById('signUp');
var signInButton = document.getElementById('signIn');
var container = document.getElementById('container');
signUpButton.addEventListener('click', function () {
  return container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', function () {
  return container.classList.remove('right-panel-active');
});
var logIn = document.querySelector(".overlay-container");

if (logIn) {
  var buttonSignUp = logIn.querySelector("button.ghost#signUp ");

  if (buttonSignUp) {
    buttonSignUp.addEventListener("click", function () {
      logIn.classList.add("fade-out");
      setTimeout(function () {
        var url = new URL(window.location.href);

        if (url.pathname === "/auth/login") {
          url.pathname = "/auth/signup";
        }

        window.location.href = url.href;
      }, 300); // Thời gian chờ (ms) trước khi chuyển trang
    });
  }
} // Show Alert


var showAlert = document.querySelector("[show-alert]");

if (showAlert) {
  var time = parseInt(showAlert.getAttribute("data-time")) || 3000;
  var closeAlert = showAlert.querySelector("[close-alert]"); // Hàm để ẩn đi cảnh báo

  var hideAlert = function hideAlert() {
    showAlert.classList.add("alert-hidden");
  }; // Thiết lập timeout để ẩn đi cảnh báo sau khoảng thời gian đã cho


  var timeoutId = setTimeout(hideAlert, time); // Xử lý sự kiện khi click vào nút đóng (dấu X)

  closeAlert.addEventListener("click", function () {
    // Hủy timeout để ngăn việc ẩn đi cảnh báo
    clearTimeout(timeoutId); // Gọi hàm để ẩn đi cảnh báo

    hideAlert();
  });
} // End Show Alert
// an hien con amt


var input1 = document.querySelector(".input1");
var eyeOpen = document.querySelector(".eye-open");
var eyeClose = document.querySelector(".eye-close");
eyeOpen.addEventListener("click", function () {
  eyeOpen.classList.add("hidden");
  input1.setAttribute("type", "password");
  eyeClose.classList.remove("hidden");
});
eyeClose.addEventListener("click", function () {
  eyeOpen.classList.remove("hidden");
  eyeClose.classList.add("hidden");
  input1.setAttribute("type", "text");
});