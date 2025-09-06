// dates.js - Handles dynamic date display in footer

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in copyright
    function setCurrentYear() {
        const currentYearElement = document.getElementById('currentyear');
        if (currentYearElement) {
            const currentYear = new Date().getFullYear();
            currentYearElement.textContent = currentYear;
        }
    }

    // Set last modified date
    function setLastModified() {
        const lastModifiedElement = document.getElementById('lastModified');
        if (lastModifiedElement) {
            const lastModified = document.lastModified;
            lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
        }
    }

    // Format date for better readability (optional enhancement)
    function formatLastModified() {
        const lastModifiedElement = document.getElementById('lastModified');
        if (lastModifiedElement) {
            const lastModified = new Date(document.lastModified);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedDate = lastModified.toLocaleDateString('en-US', options);
            lastModifiedElement.textContent = `Last Modified: ${formattedDate}`;
        }
    }

    // Initialize date functions
    setCurrentYear();
    setLastModified(); // Use basic format as required by assignment
    
    // Optional: Uncomment below to use formatted date instead
    // formatLastModified();
});