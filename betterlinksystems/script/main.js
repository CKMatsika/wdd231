// main.js - Updated with functionality meeting all JavaScript requirements

// 1. DOM Interaction: Selecting elements, modifying them, and reacting to events
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const scrollToTopButton = document.querySelector(".scroll-to-top");
const contactForm = document.querySelector("#contact-form");
const itemContainer = document.querySelector("#item-container");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".modal-close");

// 2. Example array data (used to dynamically create 15 items)
const itemsData = [
    { id: 1, title: "Item 1", description: "Description of Item 1", price: "$100", img: "img/item1.jpg" },
    { id: 2, title: "Item 2", description: "Description of Item 2", price: "$200", img: "img/item2.jpg" },
    { id: 3, title: "Item 3", description: "Description of Item 3", price: "$300", img: "img/item3.jpg" },
    { id: 4, title: "Item 4", description: "Description of Item 4", price: "$400", img: "img/item4.jpg" },
    { id: 5, title: "Item 5", description: "Description of Item 5", price: "$500", img: "img/item5.jpg" },
    { id: 6, title: "Item 6", description: "Description of Item 6", price: "$600", img: "img/item6.jpg" },
    { id: 7, title: "Item 7", description: "Description of Item 7", price: "$700", img: "img/item7.jpg" },
    { id: 8, title: "Item 8", description: "Description of Item 8", price: "$800", img: "img/item8.jpg" },
    { id: 9, title: "Item 9", description: "Description of Item 9", price: "$900", img: "img/item9.jpg" },
    { id: 10, title: "Item 10", description: "Description of Item 10", price: "$1000", img: "img/item10.jpg" },
    { id: 11, title: "Item 11", description: "Description of Item 11", price: "$1100", img: "img/item11.jpg" },
    { id: 12, title: "Item 12", description: "Description of Item 12", price: "$1200", img: "img/item12.jpg" },
    { id: 13, title: "Item 13", description: "Description of Item 13", price: "$1300", img: "img/item13.jpg" },
    { id: 14, title: "Item 14", description: "Description of Item 14", price: "$1400", img: "img/item14.jpg" },
    { id: 15, title: "Item 15", description: "Description of Item 15", price: "$1500", img: "img/item15.jpg" }
];

// 3. Dynamic Creation of 15 Items with Template Literals and Array Method
const createItems = (items) => {
    items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="item-img">
            <h3 class="item-title">${item.title}</h3>
            <p class="item-description">${item.description}</p>
            <p class="item-price">${item.price}</p>
            <button class="view-details" data-id="${item.id}">View Details</button>
        `;
        itemContainer.appendChild(itemElement);
    });
};

// 4. Event Listener for Modal
const openModal = (id) => {
    // Find the item by ID to display in the modal (just an example)
    const item = itemsData.find(item => item.id === parseInt(id));
    if (item) {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${item.img}" alt="${item.title}" class="modal-img">
                <h2 class="modal-title">${item.title}</h2>
                <p class="modal-description">${item.description}</p>
                <p class="modal-price">${item.price}</p>
            </div>
        `;
        modal.style.display = "block";
    }
};

// 5. Event Listener for Closing Modal
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

// 6. Event Listener for View Details Button (Opens Modal)
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("view-details")) {
        const itemId = event.target.getAttribute("data-id");
        openModal(itemId);
    }
});

// 7. Fetch JSON Data Using Asynchronous Function and Try Block
const fetchItemsData = async () => {
    try {
        const response = await fetch("path_to_your_json_data.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        createItems(data); // Dynamically create items from fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// 8. Example Usage of LocalStorage (Save Items View Count)
const saveItemViewCount = (id) => {
    let views = localStorage.getItem(id) ? parseInt(localStorage.getItem(id)) : 0;
    views++;
    localStorage.setItem(id, views);
    console.log(`Item ${id} viewed ${views} times.`);
};

// 9. Conditional Branching: Show Scroll to Top Button Based on Scroll Position
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

// 10. Smooth Scroll to Top
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 11. Conditional Branching: Form Validation Example
if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        let isValid = true;
        const nameField = contactForm.querySelector("#name");
        const emailField = contactForm.querySelector("#email");
        const messageField = contactForm.querySelector("#message");

        // Basic validation
        if (!nameField.value.trim()) {
            nameField.classList.add("error");
            isValid = false;
        } else {
            nameField.classList.remove("error");
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(emailField.value.trim())) {
            emailField.classList.add("error");
            isValid = false;
        } else {
            emailField.classList.remove("error");
        }

        if (!messageField.value.trim()) {
            messageField.classList.add("error");
            isValid = false;
        } else {
            messageField.classList.remove("error");
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}

// 12. Call fetchItemsData when page loads to fetch data (if using an external JSON file)
fetchItemsData();

// 13. Initial Items Display
createItems(itemsData);

