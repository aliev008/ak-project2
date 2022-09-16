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
      windows = document.querySelectorAll("[data-modal]");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        // Остановился тут, нужно короче реализовать логику, при которой я вытаскиваю нужный мне аттрибут
        // console.log(trigger.attributes);

        // modal.querySelectorAll('input').forEach((input) => console.log(input.value));
        // console.log([...modal.querySelectorAll('input')].every((input) => input.value !== ''));
        // console.log(Array.isArray(modal.querySelectorAll('input')));
        // if ([...modal.querySelectorAll('input')].some((input) => input.value === '') && modal.getAttribute('data-modal') !== '1') {
        //   console.log(modal.getAttribute('data-modal'));
        //     return null;
        // }

        // console.log(modal.getAttribute('data-modal') !== '1');
        console.log(`modal:`, modal);
        console.log(
          [...modal.querySelectorAll("input")].some(
            (input) => input.value === ""
          )
        );

        // if ([...modal.querySelectorAll('input')].some((input) => input.value === '') && modal.getAttribute('data-modal') !== '1') {
        //   console.log(modal.getAttribute('data-modal'));
        //     return null;
        // }

        windows.forEach((window) => {
          closeModal(window);
        });

        showModal(modal);
        clearInterval(showModalByTime);
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
    5000
  );
};
