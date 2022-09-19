import { checkNumInputs, closeModal, resetState } from "./index.js";

export const forms = (state) => {
  const pageForms = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input"),
    checkboxInputs = document.querySelectorAll(".checkbox"),
    windowTypeInputs = document.querySelector("#view_type");

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Наши специалисты свяжутся с Вами в ближайшее время",
    failure: "Что-то пошло не так :-(",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach((input) => {
      input.value = "";
    });
    checkboxInputs.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.required = true;
    });

    windowTypeInputs.value = "";
  };

  pageForms.forEach((form) => {
    if (
      !form.hasAttribute("data-calc") ||
      form.getAttribute("data-calc") === "end"
    ) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        form.appendChild(statusMessage);

        const formData = new FormData(form);
        if (form.getAttribute("data-calc") === "end") {
          for (let key in state) {
            formData.append(key, state[key]);
          }
        }

        postData("./assets/server.php", formData)
          .then((result) => {
            statusMessage.textContent = message.success;
          })
          .catch((error) => {
            statusMessage.textContent = message.failure;
          })
          .finally(() => {
            clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 5000);
            resetState(state);
            if (form.getAttribute("data-calc") === "end") {
              setTimeout(() => closeModal(".popup_calc_end"), 6000);
            }
          });
      });
    }
  });
};
