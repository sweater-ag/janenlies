const links = document.querySelectorAll('.link');
const closeButton = document.querySelector('.button-close');
const contentContainers = document.querySelectorAll('.content-cont');
const primaryTexts = document.querySelectorAll('.primary-text');
// const startUpHidden = document.querySelectorAll('body *:not(.primary-text):not(.media-cont-start-up:not(.media-cont-start-up img))');
const startUpHidden = document.querySelectorAll('p:not(.primary-text)');
const imageContent = document.querySelector('.media-cont');
const mediaContStartUp = document.querySelectorAll('.media-cont-start-up');

console.log("mediaContStartUp", mediaContStartUp);


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
    mobileStartUp();
    const targetId = e.target.id + "-content";
    showContent(targetId);
};

const handleCloseClick = () => {
    hideAllContent();
    closeButton.classList.add("hidden");
};

// -------- mobile animation --------

const mobileStartUp = () => {
    links.forEach(link => { link.classList.remove("white-text"); });
    mediaContStartUp.forEach(element => { element.classList.add("hidden"); });
}
//-------- desktop animation --------

const beforeClick = () => {
    mediaContStartUp.forEach(element => { element.classList.remove("hidden"); });
    if (window.innerWidth < 750) {
        //mobile
        links.forEach(link => { link.classList.add("white-text");});
    } else {
        //desktop
        primaryTexts.forEach(text => {
            text.classList.add("white-text");
        });
    startUpHidden.forEach(element => {
        element.classList.add("hidden");
    });
    imageContent.classList.add("hidden");
}
}

const desktopStartUp = () => {
    if (window.innerWidth < 750) {
        return;
    } else {
    primaryTexts.forEach(text => {
        text.classList.remove("white-text");
    });
    startUpHidden.forEach(element => {
        element.classList.remove("hidden");
    });
    imageContent.classList.remove("hidden");
    mediaContStartUp.forEach(element => { element.classList.add("hidden"); });
}
}

const init = () => {
    console.log("Links found:", links.length);
    hideAllContent();
    links.forEach(link => link.addEventListener("click", handleLinkClick));  // Use the handler function directly
    closeButton.addEventListener("click", handleCloseClick);
    beforeClick();
    window.addEventListener("click", desktopStartUp);
    mobileBeforeClick();
};

init();
