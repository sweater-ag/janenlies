gsap.registerPlugin(ScrollTrigger);

// mobile 
const linksMobile = document.querySelectorAll('#mobile-layout .link');
const closeButton = document.querySelector('.button-close');
const contentContainersMobile = document.querySelectorAll('.content-cont');
const startUpImgMobile = document.querySelector('#mobile-layout .media-cont-start-up');

//desktop 
const pictureDesktopContent = document.querySelector('.media-cont');
const startUpImgDesktop = document.querySelector('#desktop-layout .media-cont-start-up');
const mainGridDesktop = document.querySelector('#desktop-layout .main-grid');
const desktopText = document.querySelectorAll('#desktop-layout .desktop-text');
const primaryTextsDesktop = document.querySelectorAll('#desktop-layout .primary-text');
const overflowContainerDesktop = document.querySelectorAll('#desktop-layout .overflow-container');

const mobileQuery =  window.matchMedia('(max-width: 750px)');
const desktopQuery =  window.matchMedia('(min-width: 751px)');



console.log(overflowContainerDesktop);

// -------- mobile content interaction --------

let currentlyOpenContentId = null;

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

    if (currentlyOpenContentId === targetId) {
        hideMobileOpenContent();
        currentlyOpenContentId = null;
    } else {
        mobileStartUp();
        showContent(targetId);
        currentlyOpenContentId = targetId;
    }
};

const handleCloseClick = () => {
    hideMobileOpenContent();
    currentlyOpenContentId = null;
    closeButton.classList.add("hidden");
};

mobileDefault = () => {
    startUpImgMobile.classList.remove("hidden");
    gsap.set(linksMobile, { color: "white" });
    linksMobile.forEach(link => link.classList.remove("hidden"));
}

const mobileStartUp = () => {
    startUpImgMobile.classList.add("hidden");
    gsap.to(linksMobile, {
        duration: 0.1,
        color: "black",
    });
}


// -------- desktop content interaction --------

let desktopStartScreen;


desktopDefault = () => {
    desktopText.forEach(element => element.classList.add("hidden"));
    startUpImgDesktop.classList.remove("hidden");
    mainGridDesktop.style.cursor = "pointer";

    gsap.set(primaryTextsDesktop, { color: "white" });
    gsap.set(pictureDesktopContent, { opacity: 0, y: 80 });
    gsap.set(startUpImgDesktop, { opacity: 1 });
    gsap.set(desktopText , {opacity: 0});
    gsap.set(overflowContainerDesktop, { opacity: 0 });
}

const desktopStartUp = () => {
    if (desktopStartScreen) {
        desktopText.forEach(element => element.classList.remove("hidden"));
        mainGridDesktop.style.cursor = "default";
        desktopStartScreen = false;
        gsapSetUp();
    }
};


const gsapSetUp = () => {
    const tl = gsap.timeline();
    tl
        .to(primaryTextsDesktop, { //titles
            duration: 1,
            color: "black",
        }, "start")
        .to(startUpImgDesktop, { //image black
            duration: 1,
            opacity: 0,
            ease: "power3.inOut"
        }, "start")

        .to(overflowContainerDesktop, { //ugly white lines
            duration: 0.1,
            opacity: 1,
            ease: "power3.inOut"
        })

        .to(pictureDesktopContent, { //garden
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.inOut"
        })

        .to(desktopText, {  //text
            duration: 0.8,
            opacity:1,
            stagger: 0.8,
            ease: "sine.out",
        })
};

// -------- else --------

const textY= (box)=>{
    const y = box.scrollHeight - box.closest(".overflow-container").clientHeight;
    // console.log(y);
    //return y if it is bigger then 5
    return y;
}

//calculate the biggest y 

const scroll = () => {
    console.log("scroll meow");
    // gsap.set(".overflow-text", { y:-60 });
    const boxes = gsap.utils.toArray(".overflow-text");
    

    boxes.forEach(box => {
        console.log(textY(box));
        gsap.to(box, {
            y: -textY(box),
            ease: "none",
        scrollTrigger: {
          trigger: "section",
          start: "top top",
            end: "+=142%",
        pin: ".main-grid",
          scrub: true,
        //   markers: {
        //     startColor: "fuchsia",
        //     endColor: "fuchsia"
        //   }
        }
        });
        
    });
};

const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
} 

const handleResize = (e) => {
    beforeClick();
    console.log("resize", e);
    // if (e.matches) {
    //     console.log("mobile");
    // } else {
    //     console.log("desktop");
    // }
}

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
    // mainGridDesktop.addEventListener("click", desktopStartUp);
    desktopStartUp();
    mobileQuery.addEventListener("change", handleResize);
    scroll();
};

init();

