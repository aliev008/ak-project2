import { closeModal, closeModalByKeydown, showModal } from "./index";

export const modals = () => {
  const bindModal = ({
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
  }) => {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]"),
      calcWindows = document.querySelectorAll("[data-modal-calc]");

    triggers.forEach((trigger) => {
      if (trigger.getAttribute("type") !== "submit") {
        trigger.addEventListener("click", (e) => {
          if (e.target) {
            e.preventDefault();
          }

          windows.forEach((window) => {
            closeModal(window);
          });
          calcWindows.forEach((window) => {
            closeModal(window);
          });
          showModal(modal);
          clearInterval(showModalByTime);
          console.log(`Inside test`, trigger.getAttribute("type"));
        });
      } else {
        const previousModalWindowNumber = parseInt(modal.getAttribute("data-modal-calc"), 10) - 1,
              modalForm = document.querySelector(`[data-modal-calc='${previousModalWindowNumber}']`).querySelector("form");

        modalForm.addEventListener("submit", (e) => {
          e.preventDefault();
          
          // console.log(`test checkbox`, modalForm.querySelector('input').classList.contains(".checkbox"));
          // windowProfile.forEach((profile) => )

          windows.forEach((window) => {
            closeModal(window);
          });
          calcWindows.forEach((window) => {
            closeModal(window);
          });
          showModal(modal);
          clearInterval(showModalByTime);
        });
      }
    });

    close.addEventListener("click", () => {
      closeModal(modal);
      windows.forEach((window) => {
        window.style.display = "none";
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeClickOverlay) {
        closeModal(modal);
        windows.forEach((window) => {
          window.style.display = "none";
        });
      }
    });
  };

  bindModal({
    triggerSelector: ".popup_engineer_btn",
    modalSelector: ".popup_engineer",
    closeSelector: ".popup_engineer .popup_close",
  });

  bindModal({
    triggerSelector: ".phone_link",
    modalSelector: ".popup",
    closeSelector: ".popup .popup_close",
  });

  bindModal({
    triggerSelector: ".popup_calc_btn",
    modalSelector: ".popup_calc",
    closeSelector: ".popup_calc .popup_calc_close",
  });

  bindModal({
    triggerSelector: ".popup_calc_button",
    modalSelector: ".popup_calc_profile",
    closeSelector: ".popup_calc_profile_close",
    closeClickOverlay: false,
  });

  bindModal({
    triggerSelector: ".popup_calc_profile_button",
    modalSelector: ".popup_calc_end",
    closeSelector: ".popup_calc_end_close",
    closeClickOverlay: false,
  });

  const showModalByTime = setTimeout(
    () => showModal(document.querySelector(".popup")),
    60000
  );
};
