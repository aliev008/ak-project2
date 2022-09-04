import { closeModal, closeModalByKeydown } from "./index";

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
      windows = document.querySelectorAll("[data-modal]");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        windows.forEach((window) => {
          window.style.display = "none";
        });

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", (e) =>
          closeModalByKeydown(e, modal)
        );
      });
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

  const showModalByTime = (selector, time) => {
    setTimeout(() => {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", (e) =>
        closeModalByKeydown(e, selector)
      );
    }, time);
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

  showModalByTime(".popup", 60000);
};
