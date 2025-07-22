export function initFormSwitcher() {
  const fileInputsMap = [
    { inputId: "fileInputMobile", displayId: "fileNamesMobile" },
    { inputId: "fileInputDesktop", displayId: "fileNamesDesktop" },
  ];
   const selectors = [
    { selectId: "typeOf", docId: "documents", isCustom: true },
    { selectId: "typeOf-mobile", docId: "documents-mobile", isCustom: true },
  ];

  const individualHTML = `
    <div>
      <p><img src="images/icons/Attention.svg"> Необходимые документы для оформления услуги:</p>
      <ul>
        <li><img src="/images/icons/Passport.svg"> ID-карта или внутренний паспорт гражданина Республики Узбекистан</li>
      </ul>
    </div>
  `;
  const legalHTML = `
    <div>
      <p><img src="images/icons/Attention.svg"> Необходимые документы для оформления услуги:</p>
      <ul>
        <li><a href="#"><img src="/images/icons/Download.svg"> Бухгалтерский баланс за последний год (Форма №1)</a></li>
        <li><a href="#"><img src="/images/icons/Download.svg"> Отчёт о финансовых результатах (Форма №2)</a></li>
      </ul>
      <p id="alert"><img src="images/icons/Alert_triangle.svg"> Работаем с компаниями, зарегистрированными не менее года назад, либо при наличии подтверждённой успешной истории на рынке.</p>
    </div>
  `;
  const typeHTML = `<div></div>`;

  for (const { selectId, docId, isCustom } of selectors) {
    const documents = document.getElementById(docId);

    if (isCustom) {
      const customSelect = document.getElementById(selectId);
      const selected = customSelect?.querySelector(".selected");
      const optionsList = customSelect?.querySelector(".select-options");
      const hiddenInput = document.getElementById(selectId + "Input");

      if (!customSelect || !selected || !optionsList || !hiddenInput || !documents) continue;

      selected.addEventListener("click", () => {
        customSelect.classList.toggle("open");
      });

      document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
          customSelect.classList.remove("open");
        }
      });

      optionsList.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
          const value = li.getAttribute("data-value");
          const text = li.textContent;

          selected.textContent = text;
          hiddenInput.value = value;
          customSelect.classList.remove("open");

          updateDocuments(value, documents);
        });
      });

      updateDocuments(hiddenInput.value, documents);

    } else {
      const select = document.getElementById(selectId);
      if (!select || !documents) continue;

      select.addEventListener("change", () => {
        updateDocuments(select.value, documents);
      });
      updateDocuments(select.value, documents);
    }
  }

  function updateDocuments(value, container) {
    switch (value) {
      case "legal":
        container.innerHTML = legalHTML;
        break;
      case "individual":
        container.innerHTML = individualHTML;
        break;
      default:
        container.innerHTML = typeHTML;
        break;
    }
  }

  fileInputsMap.forEach(({ inputId, displayId }) => {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);

    if (input && display) {
      input.addEventListener("change", function () {
        if (this.files && this.files.length > 0) {
          const names = Array.from(this.files).map(f => `• ${f.name}`).join('\n');
          display.textContent = names;
        } else {
          display.textContent = '';
        }
      });
    }
  });
}
