const contentSections = document.querySelectorAll('.content'); // Get all the main content of the site
const links = document.querySelectorAll("a");

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
      section.classList.remove('fade-out');
      section.classList.add('active'); // Re-apply fade-in if coming from bfcache
    });
  }
});


// Content fades out first when navigating
document.addEventListener("DOMContentLoaded", function () {
  links.forEach(link => {
    // Check if the link is an internal link (same domain)
    if (link.hostname === window.location.hostname && link.getAttribute("href") !== "#") {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent immediate navigation
        const href = this.href; // Store the URL

        // Select all elements with the class "content" and add the fade-out class
        contentSections.forEach(section => {
          section.classList.remove('fade-out');
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

// Portfolio grid page filters
// CSS: .portfolio-item display: none; hides all the items by defalut
filterSelection("all");

function filterSelection(c) {
    var items, i;
    items = document.getElementsByClassName("portfolio-item");

    if (c === "all") c = ""; // Show all if 'all' is selected
    // Loop through all items, and filter based on class match
    for (i = 0; i < items.length; i++) {
        removeClass(items[i], "show"); // Remove the show class first
        if (items[i].className.indexOf(c) > -1) {
            addClass(items[i], "show"); // Add the show class if it matches the filter
        }
    }
}

// Function to add a class
function addClass(element, name) {
    if (element.className.indexOf(name) == -1) {
        element.className += " " + name;
    }
}

// Function to remove a class
function removeClass(element, name) {
    var arr = element.className.split(" ");
    while (arr.indexOf(name) > -1) {
        arr.splice(arr.indexOf(name), 1);
    }
    element.className = arr.join(" ");
}

// Handling active filter buttons
var btnContainer = document.getElementById("filterButtonContainer");
var btns = btnContainer.getElementsByClassName("filter-button");

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("filter-active");
        if (current.length > 0) {
            current[0].classList.remove("filter-active");
        }
        this.classList.add("filter-active");
    });
}

// Copy text by pressing button
async function handleCopy(button) {
    // Get the content directly from the clicked button's data attributes
    const htmlContent = button.getAttribute('data-citation-html');
    const plainContent = button.getAttribute('data-citation-plain');

    try {
        const data = [new ClipboardItem({
            'text/html': new Blob([htmlContent], { type: 'text/html' }),
            'text/plain': new Blob([plainContent], { type: 'text/plain' })
        })];

        await navigator.clipboard.write(data);

        // Visual feedback
        const originalText = button.innerText;
        button.innerText = "Copied!";
        button.classList.add('active'); 
        
        setTimeout(() => {
            button.innerText = originalText;
        }, 1200);

    } catch (err) {
        console.error('Copy failed', err);
    }
}