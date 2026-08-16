const contentSections = document.querySelectorAll('.content');

// Play fade in animation on page load
function showContent(index) {
  contentSections.forEach((section, i) => {
    section.classList.remove('active');
    if (i === index) {
      section.classList.add('active');
    }
  });
}

window.onload = function() {
    showContent(0);
};

// Handle page restoration from bfcache (browser back button)
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    contentSections.forEach(section => {
      section.classList.add('active');
    });
  }
});

// Portfolio grid page filters
filterSelection("all");

function filterSelection(c) {
    const items = document.querySelectorAll(".portfolio-item");
    
    items.forEach(item => {
        item.classList.remove("show");
        if (c === "all" || item.classList.contains(c)) {
            item.classList.add("show");
        }
    });
}

// Handling active filter buttons
const btnContainer = document.getElementById("filterButtonContainer");
if (btnContainer) {
    const btns = btnContainer.getElementsByClassName("filter-button");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            const current = document.querySelector(".filter-active");
            if (current) {
                current.classList.remove("filter-active");
            }
            this.classList.add("filter-active");
        });
    }
}

function viewCv() {
  const link = document.createElement('a');
  link.href = 'batuhan-dikmen-cv.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Auto scroll down slightly when pressed details on About.html
document.addEventListener("DOMContentLoaded", () => {
    const details = document.getElementById("secret-details-opener");

    if (details) {
        details.addEventListener("toggle", () => {
            if (details.open) {
                window.scrollBy({
                    top: 200,
                    behavior: "smooth"
                });
            }
        });
    }
});