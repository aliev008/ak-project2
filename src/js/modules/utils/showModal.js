import { closeModalByKeydown } from "./closeModal";

export const showModal = (modal) => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", (e) => closeModalByKeydown(e, modal));
};
