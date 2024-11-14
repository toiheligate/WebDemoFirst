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

let registerCurrentStep = 0;
const steps = document.querySelectorAll(".step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const subTitle = document.getElementById("page-subtitle");
const privacyAndPolicy = document.getElementById("register-privacy-policy-box");
const emailRegister = document.getElementById("register-email-container");
const companyComplete = document.getElementById("register-by-company-complete");

function updateStep() {
  steps.forEach((step, index) => {
    if (index <= registerCurrentStep) {
      if (index === registerCurrentStep) {
        step.classList.remove("actived");
        step.classList.add("active");
      } else {
        step.classList.remove("active");
        step.classList.add("actived");
      }
    } else {
      step.classList.remove("active");
      step.classList.remove("actived");
    }
  });

  switch (registerCurrentStep) {
    case 0:
      subTitle.textContent = "ご登録前の確認事項";
      privacyAndPolicy.classList.remove("hidden");
      emailRegister.classList.add("hidden");
      companyComplete.classList.add("hidden");
      break;
    case 1:
      subTitle.textContent = "メールアドレス入力";
      privacyAndPolicy.classList.add("hidden");
      emailRegister.classList.remove("hidden");
      companyComplete.classList.add("hidden");
      break;
    case 2:
      subTitle.classList.add("hidden");
      privacyAndPolicy.classList.add("hidden");
      emailRegister.classList.add("hidden");
      companyComplete.classList.remove("hidden");
      break;
    default:
      break;
  }

  prevBtn.disabled = registerCurrentStep === 0;
  nextBtn.disabled = registerCurrentStep === steps.length - 1;
}

function nextStep() {
  if (registerCurrentStep < steps.length - 1) {
    registerCurrentStep++;
    updateStep();
  }
}

function prevStep() {
  if (registerCurrentStep > 0) {
    registerCurrentStep--;
    updateStep();
  }
}

updateStep();
