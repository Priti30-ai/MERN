const students = [
    {
        name: "Salmaan Ahmed",
        marks: 38,
        className: "3rd",
        address: "India"
    },
    {
        name: "Riya Sharma",
        marks: 85,
        className: "10th",
        address: "123, ABC Colony, Delhi"
    },
    {
        name: "Rohan Patel",
        marks: 70,
        className: "12th",
        address: "456, XYZ Street, Mumbai"
    },
    {
        name: "Priya Singh",
        marks: 95,
        className: "8th",
        address: "789, PQR Nagar, Bangalore"
    },
    {
        name: "Ankit Gupta",
        marks: 60,
        className: "9th",
        address: "101, LMN Road, Kolkata"
    },
    {
        name: "Neha Verma",
        marks: 80,
        className: "11th",
        address: "222, DEF Avenue, Chennai"
    },
    {
        name: "Manoj Kumar",
        marks: 75,
        className: "10th",
        address: "333, GHI Lane, Hyderabad"
    },
    {
        name: "Pooja Mishra",
        marks: 88,
        className: "12th",
        address: "444, STU Colony, Pune"
    },
    {
        name: "Rajesh Singhania",
        marks: 92,
        className: "9th",
        address: "555, VWX Street, Jaipur"
    }
];

const studentContainer = document.getElementById("studentContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


function displayStudents(studentList) {

    studentContainer.innerHTML = studentList.map(function (student) {

        return `
            <div class="student-card">
                <p>Student Name: ${student.name}</p>
                <p>Marks: ${student.marks}%</p>
                <p>Class: ${student.className}</p>
                <p>Address: ${student.address}</p>
            </div>
        `;

    }).join("");
}


function searchStudents() {

    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function (student) {

        return student.name.toLowerCase().includes(searchText);

    });

    displayStudents(filteredStudents);
}


searchButton.addEventListener("click", searchStudents);

searchInput.addEventListener("input", searchStudents);


displayStudents(students);