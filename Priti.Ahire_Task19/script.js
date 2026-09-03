// SERVICE BOOKING WEB APP JavaScript DOM Implementation
// SERVICE DATA

const services = [
    {
        name: "Dry Cleaning",
        price: 200,
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80"
    },

    {
        name: "Leather & Suede Cleaning",
        price: 999,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
    },

    {
        name: "Ironing",
        price: 30,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    },

    {
        name: "Wedding Dress Cleaning",
        price: 2400,
        image: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80"
    }
];

/* This array stores all the services selected by the user.*/
let addedServices = [];


/* This variable keeps track of which service is currently displayed.*/
let currentServiceIndex = 0;

// GET HTML ELEMENTS

const serviceDisplay =
    document.getElementById("serviceDisplay");

const addedItems =
    document.getElementById("addedItems");

const totalAmount =
    document.getElementById("totalAmount");

const bookingForm =
    document.getElementById("bookingForm");

const bookButton =
    document.getElementById("bookButton");

const bookingMessage =
    document.getElementById("bookingMessage");

const logoutButton =
    document.getElementById("logoutButton");


// FUNCTION 1 DISPLAY CURRENT SERVICE

function displayService() {

    /* Get the current service from the services array.*/

    const service = services[currentServiceIndex];

    /* Create HTML for the service.*/

    serviceDisplay.innerHTML = `

        <div class="service-card">

            <img
                src="${service.image}"
                alt="${service.name}"
                class="service-image"
            >

            <div class="service-name-price">

                <span class="service-name">
                    ${service.name}
                </span>

                <span class="service-price">
                    ₹${service.price.toFixed(2)}
                </span>

            </div>


            <div class="service-buttons">

                <button
                    class="skip-button"
                    onclick="skipService()"
                >
                    Skip Item
                </button>

                <button
                    class="add-button"
                    onclick="addService()"
                >
                    Add Item
                </button>

            </div>

        </div>
    `;
}


// FUNCTION 2 ADD SERVICE

function addService() {

    /*
       Get the current service.
    */

    const service = services[currentServiceIndex];


    /*
       Add the service to the addedServices array.
    */

    addedServices.push(service);


    /*
       Update the left side of the page.
    */

    displayAddedServices();


    /*
       Move to the next service.
    */

    moveToNextService();
}

// FUNCTION 3 SKIP SERVICE

function skipService() {

    /* The user does not want this service,so simply move to the next service.*/

    moveToNextService();
}

// FUNCTION 4 MOVE TO NEXT SERVICE

function moveToNextService() {

    /* Increase the service index.*/

    currentServiceIndex++;

    /* If all services are completed,start again from the first service.*/

    if (currentServiceIndex >= services.length) {

        currentServiceIndex = 0;

        serviceDisplay.innerHTML = `

            <div class="empty-message">

                <div class="info-icon">
                    ✓
                </div>

                <p>All Services Viewed</p>

                <small>
                    You can continue adding services
                    from the beginning.
                </small>

            </div>
        `;

        /* Show the first service again after a short delay.*/

        setTimeout(function () {

            displayService();

        }, 1500);

        return;
    }

    /* Display the next service */

    displayService();
}

// FUNCTION 5 DISPLAY ADDED SERVICES

function displayAddedServices() {

    /* If there are no services,display the default message.*/

    if (addedServices.length === 0) {

        addedItems.innerHTML = `

            <div class="empty-message">

                <div class="info-icon">
                    i
                </div>

                <p>No Items Added</p>

                <small>
                    Add items to the cart from the services
                </small>

            </div>
        `;

        updateTotal();

        return;
    }

    /* Clear the old content.*/

    addedItems.innerHTML = "";

    /* Add every selected service to the left section.*/

    for (let i = 0; i < addedServices.length; i++) {

        const service = addedServices[i];

        /* Create a new div.*/

        const row = document.createElement("div");

        row.className = "service-row";

        /* Add service information.*/

        row.innerHTML = `

            <span>
                ${i + 1}
            </span>

            <span>
                ${service.name}
            </span>

            <span>
                ₹${service.price.toFixed(2)}
            </span>
        `;

        /* Add the row to the page.*/

        addedItems.appendChild(row);
    }

    /* Update total amount.*/

    updateTotal();
}
// FUNCTION 6 UPDATE TOTAL AMOUNT

function updateTotal() {

    /* Start total from zero.*/

    let total = 0;

    /* Add the price of every selected service.*/

    for (let i = 0; i < addedServices.length; i++) {

        total = total + addedServices[i].price;
    }

    /* Display total amount.*/

    totalAmount.textContent = total.toFixed(2);

    /* Enable Book Now button only when at least one service exists.*/

    if (addedServices.length > 0) {

        bookButton.disabled = false;

        bookingMessage.style.display = "none";

    } else {

        bookButton.disabled = true;

        bookingMessage.style.display = "block";
    }
}

/* BOOKING FORM */

bookingForm.addEventListener("submit", function (event) {

    /* Prevent page refresh.*/

    event.preventDefault();

    /* Check whether any service has been selected.*/

    if (addedServices.length === 0) {

        alert("Please add at least one service.");

        return;
    }

    /* Get the name entered by the user.*/

    const name =
        document.getElementById("fullName").value;

    /* Show booking confirmation.*/

    alert(
        "Booking successful!\n\n" +
        "Thank you, " + name + "!\n" +
        "Your services have been booked."
    );

    /* Clear the form.*/

    bookingForm.reset();
});

/* LOGOUT BUTTON */

logoutButton.addEventListener("click", function () {

    /* Show logout message.*/

    alert("You have been logged out.");

});

/* INITIAL DISPLAY */

/* When the webpage loads,show the first service.*/

displayService();

/*
   Display initial total amount.
*/

updateTotal();