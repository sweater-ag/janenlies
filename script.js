const links = document.querySelectorAll('.link');
const closeButton = document.querySelector('.button-close');
const contentContainers = document.querySelectorAll('.content-cont');

const hideAllContent = () => {
    contentContainers.forEach(container => {
        container.classList.add("hidden");
    });
    closeButton.classList.add("hidden");
};

const showContent = (id) => {
    hideAllContent();
    const contentToShow = document.getElementById(id);
    if (contentToShow) contentToShow.classList.remove("hidden");
    closeButton.classList.remove("hidden");
};

const handleLinkClick = (e) => {
    const targetId = e.target.id + "-content";
    showContent(targetId);
};

const handleCloseClick = () => {
    hideAllContent();
    closeButton.classList.add("hidden");
};

const init = () => {
    console.log("Links found:", links.length);
    hideAllContent();
    links.forEach(link => link.addEventListener("click", handleLinkClick));  // Use the handler function directly
    closeButton.addEventListener("click", handleCloseClick);
};

init();
