export const tabs = ({
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
  display = "block",
}) => {
  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  tabs.forEach((tab) => {
    if (tab.classList.contains("balcon_icons_img")) {
      tab.setAttribute("tabindex", 0);
      tab.style.outlineColor = "#ffc600";
    }
  });

  const hideTabContent = () => {
    content.forEach((tabContent) => (tabContent.style.display = "none"));
    tabs.forEach((tab) => tab.classList.remove(activeClass));
  };

  const showTabContent = (i = 0) => {
    content[i].style.display = display;
    tabs[i].classList.add(activeClass);
  };

  const handleAction = (event) => {
    const { target } = event;

    if (
      target &&
      (target.classList.contains(tabSelector.replace(/\./, "")) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))
    ) {
      tabs.forEach((tab, index) => {
        if (target === tab || target.parentNode === tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  };

  header.addEventListener("click", (event) => {
    handleAction(event);
  });

  header.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAction(event);
    }
  });

  hideTabContent();
  showTabContent();
};
