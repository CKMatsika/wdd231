// Update current year dynamically
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Update last modified date dynamically
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Example array for course cards (update this as per your actual data)
const courses = [
    { name: "WDD 101: Web Development", completed: true, credits: 3 },
    { name: "WDD 102: HTML and CSS", completed: false, credits: 3 },
    { name: "CSE 103: Computer Science Basics", completed: true, credits: 4 },
];

// Render course cards dynamically
const courseCardsContainer = document.querySelector(".course-cards");
courses.forEach(course => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");
    if (course.completed) {
        courseCard.style.backgroundColor = "#a8d08d"; // Different style for completed courses
    }
    courseCard.innerHTML = `
        <h3>${course.name}</h3>
        <p>Credits: ${course.credits}</p>
    `;
    courseCardsContainer.appendChild(courseCard);
});

// Optional: Adding functionality for buttons to filter courses
document.getElementById("all-courses-btn").addEventListener("click", () => {
    // Display all courses
    courseCardsContainer.innerHTML = '';  // Clear existing cards
    courses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        courseCard.innerHTML = `
            <h3>${course.name}</h3>
            <p>Credits: ${course.credits}</p>
        `;
        courseCardsContainer.appendChild(courseCard);
    });
});
