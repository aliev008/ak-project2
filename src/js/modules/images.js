export const images = () => {
  const imgPopup = document.createElement("div"),
        workSection = document.querySelector(".works"),
        bigImage = document.createElement("img");

  workSection.appendChild(imgPopup);
  imgPopup.appendChild(bigImage);

  imgPopup.classList.add("popup");
  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignItems = "center";
  imgPopup.style.display = "none";

  workSection.addEventListener("click", (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains("preview")) {
      imgPopup.style.display = "flex";
      const path = target.parentNode.getAttribute("href");
      bigImage.setAttribute("src", path);
      bigImage.classList.add("works_bigImg");
      document.body.style.overflow = "hidden";
    }

    if (target && target.matches("div.popup")) {
      imgPopup.style.display = "none";
      document.body.style.overflow = "";
    }
  });
};
