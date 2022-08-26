const modals = () => {
  const closeModal = (modal) => {
    if (modal.style !== undefined) {
      modal.style.display = "none";
    } else {
      document.querySelector(modal).style.display = "none";
    }
    document.body.style.overflow = "";
  };

  const closeModalByKeydown = (event, modal) => {
    if (event.key === "Escape") {
      closeModal(modal);
      document.removeEventListener("keydown", closeModalByKeydown);
    }
  };

  const bindModal = ({ triggerSelector, modalSelector, closeSelector }) => {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector);

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", (e) =>
          closeModalByKeydown(e, modal)
        );
      });
    });

    close.addEventListener("click", () => closeModal(modal));

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  };

  const showModalbByTime = (selector, time) => {
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

  showModalbByTime(".popup", 60000);
};

export default modals;
