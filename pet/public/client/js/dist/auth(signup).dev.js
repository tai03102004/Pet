"use strict";

var signInButton = document.getElementById('signIn');
var signUpButton = document.getElementById('signUp');
var container = document.getElementById('container');
signInButton.addEventListener('click', function () {
  return container.classList.add('right-panel-active');
});
signUpButton.addEventListener('click', function () {
  return container.classList.remove('right-panel-active');
});
var logIn = document.querySelector(".overlay-container");

if (logIn) {
  var buttonSignIn = logIn.querySelector("button.ghost.mt-5#signIn");

  if (buttonSignIn) {
    buttonSignIn.addEventListener("click", function () {
      logIn.classList.add("fade-out");
      setTimeout(function () {
        var url = new URL(window.location.href);

        if (url.pathname === "/auth/signup") {
          url.pathname = "/auth/login";
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
// Lưu tài khoản trong database


var formContainer = document.querySelector(".form-container.sign-up-container"); // email khi đăng ký

if (formContainer) {
  var email = formContainer.querySelector("#loginInput");
  var name = formContainer.querySelector("#name");
  var password = formContainer.querySelector("#password");
  console.log(name);
  var buttonClick = formContainer.querySelector("#buttonClick");
  buttonClick.addEventListener("click", function () {
    var emailValue = email.value;
    var passwordValue = password.value;
    var nameValue = name.value; // Tạo một đối tượng người dùng mới với thông tin từ form

    var newUser = {
      name: nameValue,
      email: emailValue,
      password: passwordValue
    };
    console.log(newUser);
  });
} // an hien con amt


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
}); // hiển thị hình ảnh

function previewImage(event) {
  var preview = document.getElementById('avatarPreview');
  var file = event.target.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = '#';
  }
}

var inputElement = document.getElementById('imageFile');
inputElement.addEventListener('change', previewImage);