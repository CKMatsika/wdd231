// courses.js - Handles course display and filtering functionality

// Course data array as required by assignment
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming concepts and problem solving techniques. It will provide a foundation for further study in programming and computer science.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. Students will learn to create XHTML pages, Cascading Style Sheets (CSS), and learn about modern web development practices.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const coursesContainer = document.getElementById('courses-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const creditsNumberElement = document.getElementById('credits-number');

    // Display courses in the grid
    function displayCourses(coursesToShow) {
        if (!coursesContainer) return;

        coursesContainer.innerHTML = '';

        coursesToShow.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;

            courseCard.innerHTML = `
                <div class="course-code">${course.subject} ${course.number}</div>
                <div class="course-title">${course.title}</div>
                <div class="course-credits">${course.credits} Credits</div>
            `;

            // Add click event to show course details (optional enhancement)
            courseCard.addEventListener('click', () => showCourseDetails(course));

            coursesContainer.appendChild(courseCard);
        });
    }

    // Filter courses based on subject
    function filterCourses(subject) {
        let filteredCourses;

        switch(subject) {
            case 'WDD':
                filteredCourses = courses.filter(course => course.subject === 'WDD');
                break;
            case 'CSE':
                filteredCourses = courses.filter(course => course.subject === 'CSE');
                break;
            default:
                filteredCourses = courses;
        }

        displayCourses(filteredCourses);
        updateTotalCredits(filteredCourses);
    }

    // Update total credits using reduce function as required
    function updateTotalCredits(coursesToShow) {
        if (!creditsNumberElement) return;

        const totalCredits = coursesToShow.reduce((total, course) => {
            return total + course.credits;
        }, 0);

        creditsNumberElement.textContent = totalCredits;
    }

    // Show course details (optional enhancement for better UX)
    function showCourseDetails(course) {
        const technologies = course.technology.join(', ');
        const completedStatus = course.completed ? 'Completed' : 'Not Completed';
        
        alert(`${course.subject} ${course.number}: ${course.title}\n\n` +
              `Credits: ${course.credits}\n` +
              `Status: ${completedStatus}\n` +
              `Technologies: ${technologies}\n\n` +
              `Description: ${course.description}`);
    }

    // Set up filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            // Get filter value and apply filter
            const filter = this.getAttribute('data-filter');
            filterCourses(filter);
        });
    });

    // Initialize page with all courses
    displayCourses(courses);
    updateTotalCredits(courses);

    // Add keyboard support for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });

    // Optional: Add course search functionality
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search courses...';
        searchInput.className = 'course-search';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 300px;
            padding: 0.5rem;
            margin: 1rem auto;
            display: block;
            border: 2px solid var(--primary-color);
            border-radius: 25px;
            font-size: 1rem;
        `;

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filteredCourses = courses.filter(course => 
                course.title.toLowerCase().includes(searchTerm) ||
                course.subject.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm)
            );
            displayCourses(filteredCourses);
            updateTotalCredits(filteredCourses);
        });

        // Insert search input before filter buttons
        const filterButtons = document.querySelector('.filter-buttons');
        if (filterButtons) {
            filterButtons.parentNode.insertBefore(searchInput, filterButtons);
        }
    }

    // Uncomment to enable search functionality
    // addSearchFunctionality();
});