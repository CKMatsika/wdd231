// Script to handle view toggle between grid and list views for business directory
document.addEventListener('DOMContentLoaded', () => {
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const gridViewContainer = document.getElementById("grid-view-container");
    const listViewContainer = document.getElementById("list-view-container");

    // Default to grid view
    gridViewContainer.style.display = "flex";
    listViewContainer.style.display = "none";

    gridViewBtn.addEventListener("click", () => {
        gridViewContainer.style.display = "flex";
        listViewContainer.style.display = "none";
    });

    listViewBtn.addEventListener("click", () => {
        gridViewContainer.style.display = "none";
        listViewContainer.style.display = "block";
    });
});

// Script to show the last modified date in the footer
document.addEventListener('DOMContentLoaded', () => {
    const lastModified = document.getElementById("last-modified");
    lastModified.textContent = document.lastModified;
});

// Add smooth scrolling to anchor links in the navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Script for the 'Join Us' button to navigate to the membership page
document.addEventListener('DOMContentLoaded', () => {
    const joinUsButton = document.querySelector('.cta-button');
    
    if (joinUsButton) {
        joinUsButton.addEventListener('click', () => {
            window.location.href = "membership.html";
        });
    }
});
