const links = document.querySelectorAll('.link');
const closeButton = document.querySelector('.button-close');
const contentContainers = document.querySelectorAll('.content-cont');
const primaryTexts = document.querySelectorAll('.primary-text');
const startUpHidden = document.querySelectorAll('p:not(.primary-text)');
const imageContent = document.querySelector('.media-cont');
const mediaContStartUp = document.querySelectorAll('.media-cont-start-up');
const bodycopy = document.querySelectorAll('.bodycopy');
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

let desktopStartScreen = true;



const beforeClick = () => {

    mediaContStartUp.forEach(element => element.classList.remove("hidden"));

    if (mobileQuery.matches) { // Mobile
        links.forEach(link => link.classList.add("white-text"));
    } else if (desktopQuery.matches) { // Desktop
        gsap.set([".overflow-container", startUpHidden], { opacity: 0 });
        gsap.set(mediaContStartUp, { opacity: 1 });
        gsap.set(imageContent, { opacity: 0 });
        // gsap.set( bodycopy, {opacity: 0});
        gsap.set(".primary-text", { color: "white" });
        // gsap.set(startUpHidden, {opacity: 0});

        // primaryTexts.forEach(text => text.classList.add("white-text"));
        startUpHidden.forEach(element => element.classList.add("hidden"));
        imageContent.classList.add("hidden");
    }
};


const desktopStartUp = () => {
    if (desktopQuery.matches) { // Desktop only

        // primaryTexts.forEach(text => text.classList.remove("white-text"));
        startUpHidden.forEach(element => element.classList.remove("hidden")); //2 texts

        imageContent.classList.remove("hidden");

        if (desktopStartScreen) {
            desktopStartScreen = false;
            gsapSetUp();
        }
    }
};

const gsapSetUp = () => {
    // Create a timeline for smooth control
    const tl = gsap.timeline();

    tl

        .to(".primary-text", { //titles
            duration: 1,
            color: "black",
        }, "start")

        .to(mediaContStartUp, { //image black
            duration: 1,
            opacity: 0,
            ease: "power3.inOut"
        }, "start")

        .to(imageContent, { //garden
            duration: 1,
            opacity: 1,
            ease: "power3.inOut"
        })

        .to([".overflow-container", startUpHidden], {  //texts
            duration: 1,
            opacity: 1,
            ease: "power3.inOut",
            stagger: 0.6
        }, "start");

    // .to(startUpHidden, {
    //     duration: 1.5,
    //     opacity: 1,
    //     rotation: 360,
    //     stagger: 0.2,
    //     ease: "power3.inOut"
    // }, "-=1.5")

    // .to(startUpHidden, {
    //     duration: 1.5,
    //     opacity: 1,
    //     rotation: 360,
    //     stagger: 0.2,
    //     ease: "power3.inOut"
    // }, "-=1.5")

    // .from(bodycopy, {
    //     duration: 2,
    //     rotation: 20,
    //     opacity: 0,
    //     stagger: 0.2,
    //     ease: "power3.inOut"
    // }, "-=1.5")

};

// -------- init --------
const init = () => {
    console.log("Links found:", links.length);
    hideAllContent();
    links.forEach(link => link.addEventListener("click", handleLinkClick));
    closeButton.addEventListener("click", handleCloseClick);
    beforeClick();
    window.addEventListener("click", desktopStartUp);
};

init();
