export const closeModal = (modal) => {
  if (modal.style !== undefined) {
    modal.style.display = "none";
  } else {
    document.querySelector(modal).style.display = "none";
  }
  document.body.style.overflow = "";
};

export const closeModalByKeydown = (event, modal) => {
  if (event.key === "Escape") {
    closeModal(modal);
    document.removeEventListener("keydown", closeModalByKeydown);
  }
};
