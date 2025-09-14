document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    const copyrightYearSpan = document.getElementById('copyright-year');
    const lastModifiedSpan = document.getElementById('last-modified');

    const membersURL = 'data/members.json';

    // Function to fetch and display members
    async function getMembers() {
        try {
            const response = await fetch(membersURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error('Error fetching member data:', error);
            membersContainer.innerHTML = '<p class="error">Sorry, we could not load the member directory at this time.</p>';
        }
    }

    // Function to display members on the page
    function displayMembers(members) {
        membersContainer.innerHTML = ''; // Clear previous content
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';

            // Set membership level for styling
            if (member.membershipLevel === 3) {
                memberCard.classList.add('gold-member');
            } else if (member.membershipLevel === 2) {
                memberCard.classList.add('silver-member');
            }

            memberCard.innerHTML = `
                <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="description">${member.description}</p>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            membersContainer.appendChild(memberCard);
        });
    }

    // Event Listeners for Grid/List view toggle
    gridBtn.addEventListener('click', () => {
        membersContainer.classList.add('members-grid');
        membersContainer.classList.remove('members-list');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        membersContainer.classList.remove('members-grid');
        membersContainer.classList.add('members-list');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });

    // Update Footer Information
    function updateFooter() {
        const currentYear = new Date().getFullYear();
        copyrightYearSpan.textContent = currentYear;

        const lastModifiedDate = document.lastModified;
        lastModifiedSpan.textContent = lastModifiedDate;
    }

    // Initial calls
    getMembers();
    updateFooter();
});