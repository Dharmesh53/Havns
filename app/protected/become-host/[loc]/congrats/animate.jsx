import { useEffect } from "react";

const Confettiful = () => {
  useEffect(() => {
    const containerEl = document.createElement("div");
    containerEl.classList.add("confetti-container");
    document.querySelector(".js-container").appendChild(containerEl);

    const renderConfetti = () => {
      const confettiEl = document.createElement("div");
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiColors = [
        "#EF2964",
        "#00C09D",
        "#2D87B0",
        "#48485E",
        "#EFFF1D",
      ];
      const confettiAnimations = ["slow", "medium", "fast"];
      const confettiBackground =
        confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;
      const confettiLeft = Math.random() * pageWidth + "px";
      const confettiTop = -50 + Math.random() * 200 + "px"; // Start from the top with random initial speed
      const confettiAnimation =
        confettiAnimations[
          Math.floor(Math.random() * confettiAnimations.length)
        ];

      confettiEl.classList.add(
        "confetti",
        "confetti--animation-" + confettiAnimation
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.top = confettiTop;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      containerEl.appendChild(confettiEl);
    };

    const confettiInterval = setInterval(renderConfetti, 25);

    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  return <div className="js-container -z-50 "></div>;
};

export default Confettiful;
