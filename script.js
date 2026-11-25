const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "فتح القائمة" : "إغلاق القائمة");
  mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
    mainNav.classList.remove("is-open");
  }
});

const messageInput = document.querySelector("#message");
const charCount = document.querySelector("#char-count");
const form = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

messageInput.addEventListener("input", () => {
  charCount.textContent = `${messageInput.value.length} / 1000`;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();

  if (!message) {
    formFeedback.textContent = "يرجى كتابة رسالتك قبل الحفظ.";
    formFeedback.classList.add("error");
    messageInput.focus();
    return;
  }

  const entry = {
    name: document.querySelector("#name").value.trim(),
    message,
    savedAt: new Date().toISOString()
  };

  try {
    const savedMessages = JSON.parse(localStorage.getItem("nabdh-messages") || "[]");
    savedMessages.push(entry);
    localStorage.setItem("nabdh-messages", JSON.stringify(savedMessages));
  } catch (error) {
    formFeedback.textContent = "تعذّر حفظ الرسالة في هذا المتصفح. حاول مرة أخرى.";
    formFeedback.classList.add("error");
    return;
  }

  formFeedback.textContent = "تم حفظ رسالتك على هذا الجهاز.";
  formFeedback.classList.remove("error");
  form.reset();
  charCount.textContent = "0 / 1000";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
