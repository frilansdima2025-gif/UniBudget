document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     1. Статусна картинка / текст
     ======================= */
  const expenseRows = document.querySelectorAll("table tbody tr");
  const stateImage = document.getElementById("state-image");
  const stateText = document.getElementById("state-text");

  if (stateImage && stateText) {
    const hasExpenses = expenseRows.length > 0;
    const emptySrc = stateImage.dataset.emptySrc;
    const allsetSrc = stateImage.dataset.allsetSrc;

    if (hasExpenses) {
      // Є витрати → показуємо “успішну” картинку
      stateImage.src = allsetSrc;
      stateText.textContent = "Всі витрати додано! 👏";
    } else {
      // Немає витрат → стандартна картинка
      stateImage.src = emptySrc;
      stateText.textContent = "Поки що немає витрат. Додай першу вище 👇";
    }
  }

  /* =======================
     2. Живий підрахунок суми
     ======================= */
  const amountInput   = document.getElementById("amount-input");
  const totalElement  = document.getElementById("total-amount");
  const previewBox    = document.getElementById("preview-box");
  const previewAmount = document.getElementById("preview-amount");

  if (amountInput && totalElement && previewBox && previewAmount) {
    const baseTotal = parseFloat(totalElement.dataset.total) || 0;

    amountInput.addEventListener("input", () => {
      const raw   = amountInput.value.replace(",", ".");
      const value = parseFloat(raw);

      if (!isNaN(value) && value > 0) {
        const newTotal = baseTotal + value;
        previewAmount.textContent = newTotal.toFixed(2);
        previewBox.style.display = "block";
      } else {
        previewBox.style.display = "none";
      }
    });
  }

  /* =======================
     3. Темний / світлий режим
     ======================= */
  const themeBtn = document.getElementById("theme-btn");

  if (themeBtn) {
    // Читаємо збережену тему (якщо є)
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeBtn.textContent = "☀️ Світлий режим";
    } else {
      themeBtn.textContent = "🌑 Темний режим";
    }

    themeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");

      // Міняємо текст на кнопці
      themeBtn.textContent = isDark ? "☀️ Світлий режим" : "🌑 Темний режим";

      // Запам’ятовуємо вибір
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  /* =======================
     4. Анімація завантаження сторінки
     ======================= */
  document.body.classList.add("page-loaded");
});
