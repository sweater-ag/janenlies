const links = document.querySelectorAll('.link');
const closeButton = document.querySelector('.button-close');
const contentContainers = document.querySelectorAll('.content-cont');
const primaryTexts = document.querySelectorAll('.primary-text');
const startUpHidden = document.querySelectorAll('p:not(.primary-text)');
const imageContent = document.querySelector('.media-cont');
const mediaContStartUp = document.querySelectorAll('.media-cont-start-up');

const mobileQuery = matchMedia('(max-width: 750px)');
const desktopQuery = matchMedia('(min-width: 751px)');



// -------- mobile content interaction --------

let currentlyOpenContentId = null;

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

    if (currentlyOpenContentId === targetId) { 
        hideAllContent(); 
        currentlyOpenContentId = null; 
    } else { 
        mobileStartUp();
        showContent(targetId);
        currentlyOpenContentId = targetId;
    }
};

const handleCloseClick = () => {
    hideAllContent();
    currentlyOpenContentId = null; 
    closeButton.classList.add("hidden");
};

// -------- mobile animation --------
const mobileStartUp = () => {
    links.forEach(link => link.classList.remove("white-text"));
    mediaContStartUp.forEach(element => element.classList.add("hidden"));
};

// -------- desktop animation --------
const beforeClick = () => {
    mediaContStartUp.forEach(element => element.classList.remove("hidden"));

    if (mobileQuery.matches) { // Mobile
        links.forEach(link => link.classList.add("white-text"));
    } else if (desktopQuery.matches) { // Desktop
        primaryTexts.forEach(text => text.classList.add("white-text"));
        startUpHidden.forEach(element => element.classList.add("hidden"));
        imageContent.classList.add("hidden");
    }
};

const desktopStartUp = () => {
    if (desktopQuery.matches) { // Desktop only
        primaryTexts.forEach(text => text.classList.remove("white-text"));
        startUpHidden.forEach(element => element.classList.remove("hidden"));
        imageContent.classList.remove("hidden");
        mediaContStartUp.forEach(element => element.classList.add("hidden"));
    }
};

// -------- Initialization --------
const init = () => {
    console.log("Links found:", links.length);
    hideAllContent();
    links.forEach(link => link.addEventListener("click", handleLinkClick));
    closeButton.addEventListener("click", handleCloseClick);
    beforeClick();
    window.addEventListener("click", desktopStartUp);
};

init();
