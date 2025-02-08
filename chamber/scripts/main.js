document.addEventListener("DOMContentLoaded", function () {
    // Toggle between grid and list views
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const contentContainer = document.querySelector('.content-container');

    gridViewBtn.addEventListener('click', function () {
        contentContainer.classList.remove('list-view');
        contentContainer.classList.add('grid-view');
    });

    listViewBtn.addEventListener('click', function () {
        contentContainer.classList.remove('grid-view');
        contentContainer.classList.add('list-view');
    });

    // Display last modified date in the footer
    const lastModifiedElement = document.querySelector('.last-modified');
    const lastModifiedDate = new Date(document.lastModified);
    lastModifiedElement.textContent = `Last modified: ${lastModifiedDate.toLocaleString()}`;

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // 'Join Us' button functionality
    const joinUsBtn = document.querySelector('.join-us-btn');
    joinUsBtn.addEventListener('click', function () {
        window.location.href = '/join-us';
    });

    // Fetch and display weather data
    const weatherElement = document.querySelector('.weather');
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Harare&appid=your-api-key&units=metric')
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            weatherElement.textContent = `Current temperature: ${temperature}°C, ${description}`;
        })
        .catch(error => {
            weatherElement.textContent = 'Unable to fetch weather data at the moment.';
        });

    // Dynamically load business directory
    const businessDirectory = document.querySelector('.business-directory');
    fetch('/api/business-directory')
        .then(response => response.json())
        .then(data => {
            businessDirectory.innerHTML = data.map(business => `
                <div class="business-item">
                    <h3>${business.name}</h3>
                    <p>${business.description}</p>
                    <p>Location: ${business.location}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            businessDirectory.innerHTML = '<p>Unable to load business directory at the moment.</p>';
        });

    // 'Last Visit' message for discovery.html
    if (window.location.pathname.includes('discovery.html')) {
        const lastVisitElement = document.querySelector('.last-visit');
        const lastVisit = localStorage.getItem('lastVisit');
        if (lastVisit) {
            lastVisitElement.textContent = `Your last visit was on: ${new Date(lastVisit).toLocaleString()}`;
        } else {
            lastVisitElement.textContent = 'This is your first visit!';
        }
        localStorage.setItem('lastVisit', new Date());
    }
});
