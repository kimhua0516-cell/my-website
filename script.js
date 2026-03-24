const rotatingPhrases = [
  "Software Systems Development",
  "Web Application Development",
  "Structured Problem Solving",
  "Fresh Graduate Readiness"
];

const roleElement = document.getElementById("rotating-role");
const counters = document.querySelectorAll("[data-counter]");
const topbar = document.querySelector(".topbar");
const currentYear = document.getElementById("year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (roleElement) {
  let phraseIndex = 0;

  window.setInterval(() => {
    phraseIndex = (phraseIndex + 1) % rotatingPhrases.length;
    roleElement.classList.add("fade-swap");

    window.setTimeout(() => {
      roleElement.textContent = rotatingPhrases[phraseIndex];
      roleElement.classList.remove("fade-swap");
    }, 180);
  }, 2400);
}

const animateCounter = (entry) => {
  const target = Number(entry.target.dataset.counter);
  const duration = 1100;
  const startTime = performance.now();

  const tick = (timestamp) => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * target);
    entry.target.textContent = currentValue;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      entry.target.textContent = target;
    }
  };

  window.requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    animateCounter(entry);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));

window.addEventListener("scroll", () => {
  if (!topbar) {
    return;
  }

  topbar.classList.toggle("scrolled", window.scrollY > 8);
});

AOS.init({
  once: true,
  duration: 900,
  easing: "ease-out-cubic"
});
