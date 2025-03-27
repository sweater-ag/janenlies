class BoxOverflow {
    constructor(boxElement) {
        this.boxElement = boxElement;
        this.overflowValue = this.calculateOverflow();

        if (this.overflowValue > 0) {
            this.animateOverflow();
        }

        console.log("box", this.boxElement, "overflow", this.overflowValue);
    }

    calculateOverflow() {
        return this.boxElement.scrollHeight - this.boxElement.closest(".overflow-container").clientHeight;
    }

    animateOverflow() {
        gsap.to(this.boxElement, {
            y: () => -(this.overflowValue + 20),
            duration: 1,
            ease: "easeInOut",
            scrollTrigger: {
                trigger: ".main-grid",
                start: "top top",
                end: "bottom top",
                scrub: true,
                // markers: true,
            },
            onComplete: () => {
                console.log("Animation Complete for", this.boxElement);
            }
        });
    }

    updateOverflow() {
        this.overflowValue = this.calculateOverflow();
        if (this.overflowValue > 0) {
            this.animateOverflow();
        }
    }
}

const body = document.querySelector("body");
const boxes = gsap.utils.toArray(".overflow-text");
let overflowY = 1000;

const boxInstances = boxes.map(box => new BoxOverflow(box));


window.innerWidth > 750 && (body.style.height = (window.innerHeight + overflowY) + "px");




// window.addEventListener('resize', () => {
//     overflowY = 0;
//     boxInstances.forEach(instance => {
//         instance.updateOverflow();
//         overflowY = Math.max(overflowY, instance.overflowValue);
//     });
//     body.style.height = (window.innerHeight + overflowY) + "px";
// });
