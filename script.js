// Fade in the HTML files when loaded
const contentSections = document.querySelectorAll('.content'); // Get all the main content of the site

function showContent(index) {
  contentSections.forEach((section, i) => {
    section.classList.remove('active');
    if (i === index) {
      section.classList.add('active');
    }
  });
}

window.onload = function() {
    showContent(0)
};