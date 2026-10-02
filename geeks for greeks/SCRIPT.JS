/* =========================================
   CAMPUSSHARE JAVASCRIPT
   ========================================= */


/* RESOURCE DATABASE */

const resources = [

    {
        id: 1,
        name: "IoT Laboratory",
        category: "Lab",
        icon: "🔬",
        location: "Block A - 2nd Floor",
        status: "Available",
        owner: "ECE Department",
        description: "IoT development and embedded systems laboratory."
    },

    {
        id: 2,
        name: "ESP32 Development Kit",
        category: "Equipment",
        icon: "💻",
        location: "Innovation Lab",
        status: "Available",
        owner: "IoT Club",
        description: "ESP32 kits for IoT and embedded projects."
    },

    {
        id: 3,
        name: "AI & ML Laboratory",
        category: "Lab",
        icon: "🤖",
        location: "Block B - 1st Floor",
        status: "Booked",
        owner: "CSE Department",
        description: "Computing lab for AI and machine learning projects."
    },

    {
        id: 4,
        name: "Python Programming Book",
        category: "Book",
        icon: "📚",
        location: "Central Library",
        status: "Available",
        owner: "Library",
        description: "Python programming reference book."
    },

    {
        id: 5,
        name: "Innovation Workspace",
        category: "Space",
        icon: "🏫",
        location: "Innovation Center",
        status: "Available",
        owner: "Innovation Cell",
        description: "Collaborative workspace for student projects."
    },

    {
        id: 6,
        name: "Web Development Expert",
        category: "Expert",
        icon: "👨‍💻",
        location: "Student Community",
        status: "Available",
        owner: "AIML Student",
        description: "Student mentor experienced in HTML, CSS and JavaScript."
    },

    {
        id: 7,
        name: "Arduino Sensor Kit",
        category: "Equipment",
        icon: "⚙️",
        location: "Robotics Lab",
        status: "Available",
        owner: "Robotics Club",
        description: "Arduino boards and sensors for prototype development."
    },

    {
        id: 8,
        name: "Seminar Hall",
        category: "Space",
        icon: "🏢",
        location: "Main Block",
        status: "Available",
        owner: "Administration",
        description: "Large seminar hall for workshops and presentations."
    },

    {
        id: 9,
        name: "Data Science Expert",
        category: "Expert",
        icon: "🧑‍🔬",
        location: "Student Community",
        status: "Available",
        owner: "AIML Student",
        description: "Student mentor experienced in Python and machine learning."
    }

];


/* CURRENT FILTER */

let currentFilter = "All";

let selectedResource = null;


/* =========================================
   LOGIN
   ========================================= */

function login() {

    const collegeId =
        document.getElementById("collegeId").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const role =
        document.getElementById("role").value;

    const message =
        document.getElementById("loginMessage");


    if (role === "student") {

        if (collegeId === "student" && password === "1234") {

            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    name: "Student User",
                    id: "student",
                    role: "student"
                })
            );

            window.location.href = "dashboard.html";

        } else {

            message.textContent =
                "❌ Invalid student login. Try student / 1234";

            message.style.color = "#b42318";
        }

    }


    else if (role === "admin") {

        if (collegeId === "admin" && password === "admin123") {

            localStorage.setItem(
                "currentUser",
                JSON.stringify({
                    name: "Campus Admin",
                    id: "admin",
                    role: "admin"
                })
            );

            window.location.href = "admin.html";

        } else {

            message.textContent =
                "❌ Invalid admin login. Try admin / admin123";

            message.style.color = "#b42318";
        }

    }

}


/* =========================================
   LOGOUT
   ========================================= */

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

}


/* =========================================
   CHECK LOGIN
   ========================================= */

function checkLogin(requiredRole) {

    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    if (!user) {

        window.location.href = "index.html";

        return null;

    }

    if (requiredRole && user.role !== requiredRole) {

        window.location.href = "index.html";

        return null;

    }

    return user;

}


/* =========================================
   DISPLAY RESOURCES
   ========================================= */

function displayResources() {

    const grid =
        document.getElementById("resourceGrid");

    if (!grid) return;


    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    const filtered =
        resources.filter(resource => {

            const matchesCategory =
                currentFilter === "All" ||
                resource.category === currentFilter;

            const matchesSearch =
                resource.name.toLowerCase().includes(search) ||
                resource.location.toLowerCase().includes(search) ||
                resource.category.toLowerCase().includes(search);

            return matchesCategory && matchesSearch;

        });


    grid.innerHTML = "";


    if (filtered.length === 0) {

        grid.innerHTML =
            `<p>No resources found.</p>`;

        return;

    }


    filtered.forEach(resource => {

        const statusClass =
            resource.status === "Available"
                ? "available"
                : "booked";


        const button =
            resource.status === "Available"
                ? `<button onclick="openBooking(${resource.id})">
                        Request / Book
                   </button>`
                : `<button disabled>
                        Currently Booked
                   </button>`;


        grid.innerHTML += `

            <div class="resource-card">

                <div class="resource-top">

                    <div class="resource-icon">
                        ${resource.icon}
                    </div>

                    <span class="status ${statusClass}">
                        ${resource.status}
                    </span>

                </div>

                <h3>${resource.name}</h3>

                <p>📍 ${resource.location}</p>

                <p>👤 ${resource.owner}</p>

                <p>${resource.description}</p>

                ${button}

            </div>

        `;

    });

}


/* =========================================
   FILTER
   ========================================= */

function filterResources(category) {

    currentFilter = category;


    document.querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    event.target.classList.add("active");


    displayResources();

}


/* =========================================
   OPEN BOOKING
   ========================================= */

function openBooking(id) {

    selectedResource =
        resources.find(
            resource => resource.id === id
        );


    if (!selectedResource) return;


    const modal =
        document.getElementById("bookingModal");


    const details =
        document.getElementById("resourceDetails");


    details.innerHTML = `

        <div class="recommendation-box">

            <strong>
                ${selectedResource.icon}
                ${selectedResource.name}
            </strong>

            <p>
                📍 ${selectedResource.location}
            </p>

            <p>
                ${selectedResource.description}
            </p>

        </div>

    `;


    const date =
        document.getElementById("bookingDate");

    date.value =
        new Date().toISOString().split("T")[0];


    modal.style.display = "flex";

}


/* =========================================
   CLOSE MODAL
   ========================================= */

function closeModal() {

    const modal =
        document.getElementById("bookingModal");

    modal.style.display = "none";

}


/* =========================================
   SUBMIT BOOKING
   ========================================= */

function submitBooking() {

    if (!selectedResource) return;


    const date =
        document.getElementById("bookingDate").value;

    const time =
        document.getElementById("bookingTime").value;

    const purpose =
        document.getElementById("bookingPurpose").value.trim();


    if (!date || !purpose) {

        alert(
            "Please select a date and enter the purpose."
        );

        return;

    }


    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    const requests =
        JSON.parse(
            localStorage.getItem("requests") || "[]"
        );


    const newRequest = {

        id: Date.now(),

        student:
            user ? user.name : "Student User",

        studentId:
            user ? user.id : "student",

        resource:
            selectedResource.name,

        resourceId:
            selectedResource.id,

        date: date,

        time: time,

        purpose: purpose,

        status: "Pending"

    };


    requests.push(newRequest);


    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );


    alert(
        "✅ Resource request submitted successfully!"
    );


    closeModal();


    document.getElementById("bookingPurpose").value = "";


    displayMyRequests();

    updateStatistics();

}


/* =========================================
   DISPLAY MY REQUESTS
   ========================================= */

function displayMyRequests() {

    const container =
        document.getElementById("myRequests");

    if (!container) return;


    const user =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    const requests =
        JSON.parse(
            localStorage.getItem("requests") || "[]"
        );


    const myRequests =
        requests.filter(
            request =>
                request.studentId ===
                (user ? user.id : "student")
        );


    container.innerHTML = "";


    if (myRequests.length === 0) {

        container.innerHTML =
            `<p>No resource requests yet.</p>`;

        return;

    }


    myRequests.reverse().forEach(request => {

        const statusClass =
            request.status.toLowerCase();


        container.innerHTML += `

            <div class="request-card">

                <div class="request-info">

                    <h3>${request.resource}</h3>

                    <p>
                        📅 ${request.date}
                        &nbsp; | &nbsp;
                        ⏰ ${request.time}
                    </p>

                    <p>
                        Purpose: ${request.purpose}
                    </p>

                </div>

                <span class="request-status ${statusClass}">
                    ${request.status}
                </span>

            </div>

        `;

    });

}


/* =========================================
   STATISTICS
   ========================================= */

function updateStatistics() {

    const total =
        document.getElementById("totalResources");

    const available =
        document.getElementById("availableResources");

    const bookings =
        document.getElementById("myBookings");


    if (total)
        total.textContent = resources.length;


    if (available)
        available.textContent =
            resources.filter(
                resource =>
                    resource.status === "Available"
            ).length;


    if (bookings) {

        const user =
            JSON.parse(
                localStorage.getItem("currentUser")
            );

        const requests =
            JSON.parse(
                localStorage.getItem("requests") || "[]"
            );


        bookings.textContent =
            requests.filter(
                request =>
                    request.studentId ===
                    (user ? user.id : "student")
            ).length;

    }

}


/* =========================================
   PROJECT RECOMMENDATION
   ========================================= */

function findRecommendations() {

    const input =
        document.getElementById("projectInput");


    const output =
        document.getElementById("recommendations");


    if (!input || !output) return;


    const project =
        input.value.toLowerCase();


    if (!project) {

        output.innerHTML = "";

        return;

    }


    let recommended = [];


    if (
        project.includes("iot") ||
        project.includes("agriculture") ||
        project.includes("smart")
    ) {

        recommended = [
            "🔬 IoT Laboratory",
            "💻 ESP32 Development Kit",
            "⚙️ Arduino Sensor Kit",
            "👨‍💻 Web Development Expert",
            "🏫 Innovation Workspace"
        ];

    }


    else if (
        project.includes("ai") ||
        project.includes("ml") ||
        project.includes("machine learning")
    ) {

        recommended = [
            "🤖 AI & ML Laboratory",
            "🧑‍🔬 Data Science Expert",
            "📚 Python Programming Book",
            "🏫 Innovation Workspace"
        ];

    }


    else if (
        project.includes("web") ||
        project.includes("website")
    ) {

        recommended = [
            "👨‍💻 Web Development Expert",
            "📚 Python Programming Book",
            "🏫 Innovation Workspace"
        ];

    }


    else {

        recommended = [
            "🏫 Innovation Workspace",
            "📚 Python Programming Book",
            "👨‍💻 Web Development Expert"
        ];

    }


    output.innerHTML = `

        <div class="recommendation-box">

            <h3>✨ Recommended Resources</h3>

            <p>
                Based on your project requirements:
            </p>

            <br>

            <div class="recommendation-list">

                ${recommended.map(item =>
                    `<div class="recommendation-item">
                        ${item}
                    </div>`
                ).join("")}

            </div>

        </div>

    `;

}


/* =========================================
   ADMIN DASHBOARD
   ========================================= */

function displayAdminRequests() {

    const container =
        document.getElementById("adminRequests");

    if (!container) return;


    const requests =
        JSON.parse(
            localStorage.getItem("requests") || "[]"
        );


    container.innerHTML = "";


    if (requests.length === 0) {

        container.innerHTML =
            `<p>No requests available.</p>`;

        return;

    }


    requests.slice().reverse().forEach(request => {

        container.innerHTML += `

            <div class="admin-request">

                <div class="admin-request-header">

                    <div>

                        <h3>
                            ${request.resource}
                        </h3>

                        <p>
                            Requested by:
                            <strong>${request.student}</strong>
                        </p>

                    </div>

                    <span class="request-status
                        ${request.status.toLowerCase()}">

                        ${request.status}

                    </span>

                </div>


                <p>
                    📅 ${request.date}
                </p>

                <p>
                    ⏰ ${request.time}
                </p>

                <p>
                    🎯 ${request.purpose}
                </p>


                ${
                    request.status === "Pending"

                    ? `

                    <div class="admin-actions">

                        <button
                            class="approve-btn"
                            onclick="updateRequest(${request.id}, 'Approved')">

                            ✓ Approve

                        </button>

                        <button
                            class="reject-btn"
                            onclick="updateRequest(${request.id}, 'Rejected')">

                            ✕ Reject

                        </button>

                    </div>

                    `

                    : ""

                }

            </div>

        `;

    });

}


/* =========================================
   UPDATE REQUEST
   ========================================= */

function updateRequest(id, status) {

    const requests =
        JSON.parse(
            localStorage.getItem("requests") || "[]"
        );


    const request =
        requests.find(
            item => item.id === id
        );


    if (!request) return;


    request.status = status;


    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );


    displayAdminRequests();

    updateAdminStats();


    alert(
        `Request ${status.toLowerCase()} successfully.`
    );

}


/* =========================================
   ADMIN STATISTICS
   ========================================= */

function updateAdminStats() {

    const resourceCount =
        document.getElementById("adminResources");

    const pending =
        document.getElementById("pendingRequests");

    const approved =
        document.getElementById("approvedRequests");


    const requests =
        JSON.parse(
            localStorage.getItem("requests") || "[]"
        );


    if (resourceCount)
        resourceCount.textContent =
            resources.length;


    if (pending)
        pending.textContent =
            requests.filter(
                request =>
                    request.status === "Pending"
            ).length;


    if (approved)
        approved.textContent =
            requests.filter(
                request =>
                    request.status === "Approved"
            ).length;

}


/* =========================================
   ADMIN RESOURCE DISPLAY
   ========================================= */

function displayAdminResources() {

    const grid =
        document.getElementById("adminResourceGrid");

    if (!grid) return;


    grid.innerHTML = "";


    resources.forEach(resource => {

        grid.innerHTML += `

            <div class="resource-card">

                <div class="resource-top">

                    <div class="resource-icon">
                        ${resource.icon}
                    </div>

                    <span class="status
                        ${
                            resource.status === "Available"
                            ? "available"
                            : "booked"
                        }">

                        ${resource.status}

                    </span>

                </div>

                <h3>${resource.name}</h3>

                <p>📍 ${resource.location}</p>

                <p>👤 ${resource.owner}</p>

                <p>${resource.description}</p>

            </div>

        `;

    });

}


/* =========================================
   PAGE INITIALIZATION
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* STUDENT PAGE */

        if (
            document.getElementById("resourceGrid")
        ) {

            const user =
                checkLogin("student");


            if (user) {

                const studentName =
                    document.getElementById(
                        "studentName"
                    );

                if (studentName)
                    studentName.textContent =
                        user.name;


                displayResources();

                displayMyRequests();

                updateStatistics();

            }

        }


        /* ADMIN PAGE */

        if (
            document.getElementById("adminRequests")
        ) {

            const user =
                checkLogin("admin");


            if (user) {

                displayAdminRequests();

                updateAdminStats();

                displayAdminResources();

            }

        }

    }
);