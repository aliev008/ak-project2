const modals = () => {
  const bindModal = ({ triggerSelector, modalSelector, closeSelector }) => {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector);

    const closeModal = (modal) => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    };

    const closeModalByKeydown = (event) => {
      console.log(event);
      if (event.key === "Escape") {
        closeModal(modal);
        document.removeEventListener("keydown", closeModalByKeydown);
      }
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", closeModalByKeydown);
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
