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

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a"); // Select all anchor links

  links.forEach(link => {
    // Check if the link is an internal link (same domain)
    if (link.hostname === window.location.hostname && link.getAttribute("href") !== "#") {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent immediate navigation
        const href = this.href; // Store the URL

        // Select all elements with the class "content" and add the fade-out class
        contentSections.forEach(section => {
          section.classList.remove('fade-out')
          section.classList.add("fade-out");
        });

        // Navigate to the new page after the fade-out
        setTimeout(function () {
          window.location.href = href;
        }, 250); // Duration should match the CSS transition
      });
    }
  });
});
