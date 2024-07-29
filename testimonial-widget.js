// Define the API base URL
const apiUrl = 'http://localhost:5000/api/testimonials/testimonials';
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #testimonial-widget-container {
            background-color: #003366; /* Dark blue background */
            color: #f0f8ff; /* Light blue text color */
            padding: 20px;
            border-radius: 10px;
            width: 300px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
        }
        
        .testimonial {
            border: 1px solid #d3d3d3; /* Light grey borders */
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            background-color: #f8f9fa; /* Very light grey background */
        }

        .testimonial p {
            margin: 5px 0;
            color: #333; /* Dark grey text for readability */
        }

        .testimonial p strong {
            color: #003366; /* Dark blue color for the author name */
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        input, textarea {
            padding: 10px;
            border: 1px solid #d3d3d3; /* Light grey borders */
            border-radius: 5px;
            font-size: 14px;
        }

        button {
            background-color: #87cefa; /* Light blue buttons */
            border: none;
            border-radius: 5px;
            padding: 10px;
            font-size: 14px;
            cursor: pointer;
            color: #fff; /* White text on the button */
        }

        button:hover {
            background-color: #00bfff; /* Brighter blue on hover */
        }
    `;
    document.head.appendChild(style);
}

// Function to render testimonials
function renderTestimonials(containerId, webId) {
    const container = document.getElementById(containerId);
    fetch(`${apiUrl}/${webId}`)
        .then(response => response.json())
        .then(testimonials => {
            testimonials.forEach(testimonial => {
                const testimonialDiv = document.createElement("div");
                testimonialDiv.classList.add("testimonial");
                testimonialDiv.innerHTML = `
                    <p>${testimonial.message}</p>
                    <p><strong>${testimonial.author}</strong></p>
                `;
                container.appendChild(testimonialDiv);
            });
        });
}

// Function to submit a testimonial
function submitTestimonial(author, message, webId) {
    fetch(`${apiUrl}/${webId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, message })
    })
        .then(response => response.json())
        .then(() => {
            alert("Thank you for your testimonial!");
        })
        .catch(error => {
            console.error("Error adding testimonial: ", error);
        });
}

// Function to create the testimonial form
function createTestimonialForm(containerId, webId) {
    const container = document.getElementById(containerId);
    const form = document.createElement("form");
    form.innerHTML = `
        <input type="text" id="author" placeholder="Your name" required />
        <textarea id="message" placeholder="Your testimonial" required></textarea>
        <button type="submit">Submit</button>
    `;
    form.onsubmit = (e) => {
        e.preventDefault();
        const author = document.getElementById("author").value;
        const message = document.getElementById("message").value;
        submitTestimonial(author, message, webId);
    };
    container.appendChild(form);
}

// Initialize the widget
function initTestimonialWidget(containerId, webId) {
    createTestimonialForm(containerId, webId);
    renderTestimonials(containerId, webId);
}

// Export the init function to be used in other scripts
window.initTestimonialWidget = initTestimonialWidget;
