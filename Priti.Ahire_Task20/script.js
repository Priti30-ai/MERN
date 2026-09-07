emailjs.init({
    publicKey: "3YmyU6BDcF76hI3RR"
});

const services = [
    {
        id: 1,
        name: "Dry Cleaning",
        price: 200,
        icon: "fa-shirt"
    },
    {
        id: 2,
        name: "Wash & Fold",
        price: 100,
        icon: "fa-box"
    },
    {
        id: 3,
        name: "Ironing",
        price: 30,
        icon: "fa-fire"
    },
    {
        id: 4,
        name: "Stain Removal",
        price: 500,
        icon: "fa-wand-magic-sparkles"
    },
    {
        id: 5,
        name: "Leather & Suede Cleaning",
        price: 999,
        icon: "fa-bag-shopping"
    },
    {
        id: 6,
        name: "Wedding Dress Cleaning",
        price: 2800,
        icon: "fa-ring"
    }
];

let cart = [];

const servicesList = document.getElementById("servicesList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");


function displayServices() {

    servicesList.innerHTML = "";

    services.forEach(function (service) {

        const isAdded = cart.some(function (item) {
            return item.id === service.id;
        });

        const serviceDiv = document.createElement("div");
        serviceDiv.className = "service-item";

        serviceDiv.innerHTML = `
            <div class="service-name">
                <i class="fa-solid ${service.icon}"></i>
                ${service.name}
                <span class="service-price">
                    ₹${service.price}
                </span>
            </div>

            <button
                class="service-btn ${isAdded ? "remove" : ""}"
                onclick="${isAdded ? `removeItem(${service.id})` : `addItem(${service.id})`}"
            >
                ${isAdded ? "Remove Item" : "Add Item"}
                <i class="fa-solid ${isAdded ? "fa-minus-circle" : "fa-plus-circle"}"></i>
            </button>
        `;

        servicesList.appendChild(serviceDiv);
    });
}


function addItem(id) {

    const service = services.find(function (item) {
        return item.id === id;
    });

    const alreadyAdded = cart.some(function (item) {
        return item.id === id;
    });

    if (!alreadyAdded) {
        cart.push(service);
    }

    updateCart();
}


function removeItem(id) {

    cart = cart.filter(function (item) {
        return item.id !== id;
    });

    updateCart();
}


function updateCart() {

    displayServices();

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-circle-info"></i>
                <strong>No Items Added</strong>
                <p>
                    Add items to the cart from the services bar
                </p>
            </div>
        `;

        totalAmount.textContent = "₹0";
        return;
    }


    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(function (item, index) {

        total += item.price;

        const row = document.createElement("div");
        row.className = "cart-row";

        row.innerHTML = `
            <span>${index + 1}</span>
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        `;

        cartItems.appendChild(row);
    });

    totalAmount.textContent = `₹${total}`;
}


const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");


bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (cart.length === 0) {
        alert("Please add at least one service to the cart.");
        return;
    }

    if (fullName === "" || email === "" || phone === "") {
        alert("Please fill all booking details.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }


    const selectedServices = cart
        .map(function (item) {
            return item.name;
        })
        .join(", ");

    const total = cart.reduce(function (sum, item) {
        return sum + item.price;
    }, 0);


    const templateParams = {
        customer_name: fullName,
        customer_email: email,
        phone_number: phone,
        services: selectedServices,
        total_amount: `₹${total}`
    };


    const bookButton = bookingForm.querySelector(".book-btn");

    bookButton.disabled = true;
    bookButton.textContent = "Sending...";


    emailjs.send(
        "service_rvunl3l",
        "template_qkdwm2a",
        templateParams
    )
        .then(function () {

            bookingMessage.style.display = "block";
            bookingMessage.textContent =
                "Thank you for booking the service. We will get back to you soon.";

            bookingForm.reset();

            cart = [];
            updateCart();

            bookButton.disabled = false;
            bookButton.textContent = "Book Now";

        })


        .catch(function (error) {

            console.log(error);

            bookingMessage.style.display = "block";
            bookingMessage.style.color = "#e75a78";
            bookingMessage.textContent =
                "Unable to send the booking confirmation email. Please try again.";

            bookButton.disabled = false;
            bookButton.textContent = "Book Now";
        });

});


const newsletterForm = document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("subscriberName").value.trim();
    const email = document.getElementById("subscriberEmail").value.trim();

    if (name === "" || email === "") {
        alert("Please enter your name and email.");
        return;
    }

    alert(`Thank you ${name}! You have subscribed to our newsletter.`);

    newsletterForm.reset();
});


displayServices();