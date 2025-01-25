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
    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
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

// Function to fetch and display weather data for Harare
async function fetchWeatherData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const city = 'Harare';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to display weather data
function displayWeatherData(data) {
    const weatherSection = document.querySelector('.weather');
    const temperature = Math.round(data.main.temp); // Round to nearest integer
    const weatherDescription = capitalizeWords(data.weather.map(e => e.description).join(', ')); // Capitalize and join descriptions
    const weatherEvents = data.weather.map(e => e.description).join(', '); // Display all weather events

    weatherSection.innerHTML = `
        <h2>Current Weather in Harare</h2>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Weather Description:</strong> ${weatherDescription}</p>
        <p><strong>Weather Events:</strong> ${weatherEvents}</p>
    `;
}

// Capitalize each word in a sentence
function capitalizeWords(sentence) {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Load weather data on page load
document.addEventListener('DOMContentLoaded', fetchWeatherData);

// Add functionality for dynamically loading the business directory from an array of businesses
document.addEventListener('DOMContentLoaded', () => {
    const businesses = [
        { name: 'ABC Corp', industry: 'Manufacturing', contact: 'abc@company.com', phone: '+263 4 123456' },
        { name: 'XYZ Ltd', industry: 'Retail', contact: 'xyz@company.com', phone: '+263 4 654321' },
        { name: '123 Enterprises', industry: 'Technology', contact: 'contact@123ent.com', phone: '+263 4 987654' }
    ];

    const gridViewContainer = document.getElementById('grid-view-container');
    const listViewContainer = document.getElementById('list-view-container');

    businesses.forEach(business => {
        const businessCard = document.createElement('div');
        businessCard.classList.add('business-card');
        
        businessCard.innerHTML = `
            <h3>${business.name}</h3>
            <p>Industry: ${business.industry}</p>
            <p>Contact: ${business.contact}</p>
            <p>Phone: ${business.phone}</p>
        `;

        // Adding to grid view container
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.appendChild(businessCard);
        gridViewContainer.appendChild(gridItem);

        // Adding to list view container
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.appendChild(businessCard);
        listViewContainer.appendChild(listItem);
    });
});


