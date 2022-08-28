export const tabs = ({
  headerSelector,
  tabSelector,
  contentSelector,
  activeClass,
}) => {
  const header = document.querySelector(headerSelector),
    tabs = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  const hideTabContent = () => {
    content.forEach((tabContent) => (tabContent.style.display = "none"));
    tabs.forEach((tab) => tab.classList.remove(activeClass));
  };

  const showTabContent = (i = 0) => {
    content[i].style.display = "block";
    tabs[i].classList.add(activeClass);
  };

  header.addEventListener("click", (e) => {
    const target = e.target;
    if (
      target &&
      (target.classList.contains(tabSelector.replace(".", "")) ||
        target.parentNode.classList.contains(tabSelector.replace(".", "")))
    ) {
      tabs.forEach((tab, index) => {
        if (target === tab || target.parentNode === tab) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  tabs.forEach((tab, index) => {
    tab.childNodes.forEach((child) => {
      child.addEventListener("focus", (e) => {
        hideTabContent();
        showTabContent(index);
      });
    });
  });

  hideTabContent();
  showTabContent();
};
