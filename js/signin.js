function toggleAnswer(element) {
  const item = element.parentNode;
  item.classList.toggle("active");
}

// Kiểm tra trạng thái đăng nhập (giả sử bằng localStorage)
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  document.getElementById("notLoggedIn").classList.toggle("hidden", isLoggedIn);
  document.getElementById("loggedIn").classList.toggle("hidden", !isLoggedIn);
  document
    .getElementById("loggedInNotification")
    .classList.toggle("hidden", !isLoggedIn);
  document
    .getElementById("nav-hidden-button")
    .classList.toggle("hidden", isLoggedIn);
}

// Hàm đăng nhập (chỉ là ví dụ)
function login() {
  localStorage.setItem("isLoggedIn", "true");
  checkLoginStatus();
}

// Hàm đăng xuất
function logout() {
  localStorage.setItem("isLoggedIn", "false");
  checkLoginStatus();
}

// Kiểm tra trạng thái khi tải trang
checkLoginStatus();

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}
