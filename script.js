const links = document.querySelectorAll('.link');
const closeButton = document.querySelector('.button-close');
const contentContainers = document.querySelectorAll('.content-cont');
const primaryTexts = document.querySelectorAll('.primary-text');
// const startUpHidden = document.querySelectorAll('body *:not(.primary-text):not(.media-cont-start-up:not(.media-cont-start-up img))');
const startUpHidden = document.querySelectorAll('p:not(.primary-text)');
const imageContent = document.querySelector('.media-cont');
const mediaContStartUp = document.querySelector('.media-cont-start-up');


// -------- mobile content interaction --------
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

// -------- mobile animation --------

//-------- desktop animation --------

const desktopBeforeClick = () => {
    primaryTexts.forEach(text => {
        text.classList.add("white-text");
    });

    startUpHidden.forEach(element => {
        element.classList.add("hidden");
    });

    imageContent.classList.add("hidden");

     mediaContStartUp.classList.remove("hidden");
}

const desktopStartUp = () => {
    primaryTexts.forEach(text => {
        text.classList.remove("white-text");
    });

    startUpHidden.forEach(element => {
        element.classList.remove("hidden");
    });
    imageContent.classList.remove("hidden");

    mediaContStartUp.classList.add("hidden");

}

const init = () => {
    console.log("Links found:", links.length);
    hideAllContent();
    links.forEach(link => link.addEventListener("click", handleLinkClick));  // Use the handler function directly
    closeButton.addEventListener("click", handleCloseClick);
    desktopBeforeClick();
    window.addEventListener("click", desktopStartUp);
};

init();
