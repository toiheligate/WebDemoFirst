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

const RegisterBy = Object.freeze({
  INDIVIDUAL: Symbol(0),
  COMPANY: Symbol(1),
});

let registerCurrentStep = 0;
let registerBy = RegisterBy.INDIVIDUAL;
const steps = document.querySelectorAll(".step");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const subTitle = document.getElementById("page-subtitle");
const privacyAndPolicy = document.getElementById("register-privacy-policy-box");
const emailRegister = document.getElementById("register-email-container");
const individualRegister = document.getElementById("individual-register");
const companyComplete = document.getElementById("register-by-company-complete");
const individualComplete = document.getElementById(
  "register-by-individual-complete"
);

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
      individualComplete.classList.add("hidden");
      break;
    case 1:
      privacyAndPolicy.classList.add("hidden");
      companyComplete.classList.add("hidden");
      individualComplete.classList.add("hidden");
      switch (registerBy) {
        case RegisterBy.INDIVIDUAL:
          subTitle.textContent = "情報登録";
          emailRegister.classList.add("hidden");
          individualRegister.classList.remove("hidden");
          updateBoxWidths();
          break;
        case RegisterBy.COMPANY:
          subTitle.textContent = "メールアドレス入力";
          emailRegister.classList.remove("hidden");
          individualRegister.classList.add("hidden");
          break;
        default:
          break;
      }
      break;
    case 2:
      subTitle.classList.add("hidden");
      privacyAndPolicy.classList.add("hidden");
      emailRegister.classList.add("hidden");
      companyComplete.classList.remove("hidden");
      individualRegister.classList.add("hidden");
      switch (registerBy) {
        case RegisterBy.INDIVIDUAL:
          individualComplete.classList.remove("hidden");
          companyComplete.classList.add("hidden");
          break;
        case RegisterBy.COMPANY:
          individualComplete.classList.add("hidden");
          companyComplete.classList.remove("hidden");
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }

  prevBtn.disabled = registerCurrentStep === 0;
  nextBtn.disabled = registerCurrentStep === steps.length - 1;
}

function nextStep(register) {
  if (register != null) {
    if (register === 0) {
      registerBy = RegisterBy.INDIVIDUAL;
    } else {
      registerBy = RegisterBy.COMPANY;
    }
  }

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

function updateBoxWidths() {
  const individualTitleWidth = document.getElementById(
    "main-individual-title"
  ).offsetWidth;

  if (window.innerWidth <= 991.98) {
    document.documentElement.style.setProperty(
      "--individual-title-width",
      `100%`
    );
  } else {
    document.documentElement.style.setProperty(
      "--individual-title-width",
      `${individualTitleWidth}px`
    );
  }
}

window.addEventListener("resize", updateBoxWidths);

function openDatePicker() {
  document.getElementById("dateInput").showPicker(); // Mở date picker
}

function togglePassword(classId) {
  const passwordInput = document.getElementById(`${classId}`);
  const toggleIcon = document.querySelector(`.toggle-${classId}`);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  }
}
