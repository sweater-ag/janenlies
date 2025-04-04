gsap.registerPlugin(ScrollTrigger);

// mobile 
const linksMobile = document.querySelectorAll('#mobile-layout .link');
const closeButton = document.querySelector('.button-close');
const contentContainersMobile = document.querySelectorAll('.content-cont');
const startUpImgMobile = document.querySelector('#mobile-layout .media-cont-start-up');
const pictureMobileContent = document.querySelector('#mobile-layout .media-cont');
const mobileText = document.querySelectorAll('#mobile-layout .bodycopy');
const mobileCopyRightText = document.querySelector('#mobile-layout .info-copyright');
const stickyContainerMobile = document.querySelector('#mobile-layout .titles-cont');


//desktop 
const pictureDesktopContent = document.querySelector('.media-cont');
const startUpImgDesktop = document.querySelector('#desktop-layout .media-cont-start-up');
const mainGridDesktop = document.querySelector('#desktop-layout .main-grid');
const desktopText = document.querySelectorAll('#desktop-layout .desktop-text');
const primaryTextsDesktop = document.querySelectorAll('#desktop-layout .primary-text');
const overflowContainerDesktop = document.querySelectorAll('#desktop-layout .overflow-container');


const mobileQuery = window.matchMedia('(max-width: 750px)');
const desktopQuery = window.matchMedia('(min-width: 751px)');


// -------- mobile content interaction --------

let currentlyOpenContentId = null;
let mobileStartScreen;
let isOverflow = false;


const hideMobileOpenContent = () => {
    contentContainersMobile.forEach(container => {
        container.classList.add("hidden");
    });
    closeButton.classList.add("hidden");
};

const showContent = (id) => {
    hideMobileOpenContent();
    const contentToShow = document.getElementById(id);
    if (contentToShow) contentToShow.classList.remove("hidden");
    closeButton.classList.remove("hidden");
};

const handleLinkClick = (e) => {
    const targetId = e.target.id + "-content";
    console.log("start screen", mobileStartScreen);

    if (mobileStartScreen) {
        mobileStartUp();
    }

    if (currentlyOpenContentId === targetId) {
        hideMobileOpenContent();
        currentlyOpenContentId = null;
    } else {
        showContent(targetId);
        currentlyOpenContentId = targetId;
        contentAppearTransition();
    }
};

const handleCloseClick = () => {
    hideMobileOpenContent();
    currentlyOpenContentId = null;
    closeButton.classList.add("hidden");
};

const mobileDefault = () => {
    mobileStartScreen = true;
    startUpImgMobile.classList.remove("hidden");
    gsap.set(linksMobile, { color: "white" });
    linksMobile.forEach(link => link.classList.remove("hidden"));
    gsap.set(startUpImgMobile, { opacity: 1 });
    stickyContainerMobile.classList.remove("titles-cont--open");
}

const tl = gsap.timeline();

const mobileStartUp = () => {
    //EXECUTES ONLY ONCE
    mobileStartScreen = false;
    tl
        .to(linksMobile, { //titles
            duration: 0.5,
            color: "black",
            ease: "power3.inOut"
        }, "start")
        .to(startUpImgMobile, { //image black
            duration: 0.5,
            opacity: 0,
            ease: "power3.inOut"
        }, "start")
        .add(() => { stickyContainerMobile.classList.add("titles-cont--open"); });
    console.log("executes only once");
}

const contentAppearTransition = () => {
    console.log("CLICKED ON THE LINK ");
    const tl = gsap.timeline();
    tl
        .fromTo(mobileText, // text
            { opacity: 0, y: 1 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.inOut" },
            "start"
        )
        .fromTo(pictureMobileContent, // garden
            { opacity: 0, y: 1 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.inOut" },
            "<+0.3"
        )
        .fromTo(mobileCopyRightText,
            { opacity: 0, y: 1 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" },
            "start+=0.5"
        );
};

const contentDisappearTransition = () => {
    console.log("CLICKED TO CLOSE ");
    const tl = gsap.timeline();
    tl
        .fromTo(mobileCopyRightText,
            { opacity: 1, y: 0 },
            { opacity: 0, y: 1, duration: 0.5, ease: "power2.inOut" },
            "start"
        )
        .fromTo(pictureMobileContent, // garden
            { opacity: 1, y: 0 },
            { opacity: 0, y: 1, duration: 0.8, ease: "power2.inOut" },
            "<+0.3"
        )
        .fromTo(mobileText, // text
            { opacity: 1, y: 0 },
            { opacity: 0, y: 1, duration: 0.8, ease: "power2.inOut" },
            "start+=0.5"
        );
};


// -------- desktop content interaction --------

let desktopStartScreen;


const desktopDefault = () => {
    desktopText.forEach(element => element.classList.add("hidden"));
    startUpImgDesktop.classList.remove("hidden");
    mainGridDesktop.style.cursor = "pointer";
    desktopStartScreen = true;

    gsap.set(primaryTextsDesktop, { color: "white" });
    gsap.set(pictureDesktopContent, { opacity: 0 });
    gsap.set(startUpImgDesktop, { opacity: 1 });
    gsap.set(desktopText, { opacity: 0, y: 1 });
    gsap.set(overflowContainerDesktop, { opacity: 0 });
}

const desktopHandleClick = () => {

    if (desktopStartScreen) {
        desktopText.forEach(element => element.classList.remove("hidden"));
        // mainGridDesktop.style.cursor = "default";
        desktopStartScreen = false;
        tlDesktopSetUp.timeScale(1);
        gsapSetUp();
        // tlDesktopSetUp.play(1);
        console.log("desktop start", tlDesktopSetUp.time());
    } else {
        tlDesktopSetUp.timeScale(1.5);
        tlDesktopSetUp.reverse();
        desktopStartScreen = true;
        console.log("desktop reverse", tlDesktopSetUp.time());
    }
};

let isAnimationComplete = false;


const tlDesktopSetUp = gsap.timeline();

const gsapSetUp = () => {

    tlDesktopSetUp
        .to(primaryTextsDesktop, { //titles
            duration: 0.5,
            color: "black",
            ease: "power3.inOut"
        }, "start")
        .to(startUpImgDesktop, { //image black
            duration: 0.5,
            opacity: 0,
            ease: "power3.inOut"
        }, "start")

        .to(overflowContainerDesktop, { //ugly white lines
            duration: 0.1,
            opacity: 1,
            ease: "power3.inOut"
        })
        .to(pictureDesktopContent, { //garden
            duration: 0.8,
            opacity: 1,
            // y: 0,
            ease: "power3.inOut"
        })

        .to(desktopText, {  //text
            duration: 0.8,
            // y: 0,
            opacity: 1,
            stagger: 0.4,
            ease: "sine.out",
        })

};

// -------- else --------

const beforeClick = () => {
    desktopStartScreen = true;
    desktopDefault();
    mobileDefault();
    hideMobileOpenContent();
};




// -------- init --------
const init = () => {
    beforeClick();
    closeButton.addEventListener("click", handleCloseClick);
    linksMobile.forEach(link => link.addEventListener("click", handleLinkClick));
    mainGridDesktop.addEventListener("click", desktopHandleClick);
    mobileQuery.addEventListener("change", () => location.reload());

    document.querySelectorAll('.overflow-text').forEach(element => {
        element.innerHTML += '<br><span style="display: block; height: 10px;"></span>';   
     });
};

init();
