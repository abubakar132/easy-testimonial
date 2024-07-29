const apiUrl = 'https://easy-testimonial.onrender.com/api/testimonials/testimonials';

// Function to inject styles
function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #testimonial-widget-container {
            background-color: #ffffff; /* White background */
            color: #333; /* Dark text for readability */
            padding: 20px;
            border-radius: 10px;
            width: 85%;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            position: relative; /* For positioning the badge */
        }

        #testimonial-widget-container .title {
            font-size: 24px;
            color: #f04e36; /* Title color */
            margin-bottom: 20px;
        }

        #testimonial-widget-container .badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #f38165; /* Badge background */
            color: #ffffff; /* Badge text color */
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            text-align: center;
            text-decoration: none;
        }

        #testimonial-widget-container .badge:hover {
            background-color: #f7b594; /* Lighter badge color on hover */
        }

        .testimonial {
            border: 1px solid #fbe9c3; /* Light background color for borders */
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
            background-color: #f7b594; /* Light background color for testimonials */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .testimonial .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .testimonial p {
            margin: 5px 0;
        }

        .testimonial p strong {
            color: #f04e36; /* Dark orange for the author */
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
            background-color: #fbe9c3;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        input, textarea {
            padding: 10px;
            border: 1px solid #f7b594; /* Light grey borders */
            border-radius: 5px;
            font-size: 14px;
        }

        button {
            background-color: #f04e36; /* Dark orange buttons */
            border: none;
            border-radius: 5px;
            padding: 12px;
            font-size: 16px;
            cursor: pointer;
            color: #fff; /* White text on the button */
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #f38165; /* Lighter orange on hover */
        }
    `;
    document.head.appendChild(style);
}

// Function to render testimonials
function renderTestimonials(containerId, webId) {
    const container = document.getElementById(containerId);
    
    // Add title
    const title = document.createElement('h1');
    title.textContent = 'Reviews';
    title.className = 'title';
    container.appendChild(title);

    // Add badge/link
    const badge = document.createElement('a');
    badge.href = 'https://easy-testimonial.vercel.app'; // You can change this to the actual URL or remove it if unnecessary
    badge.textContent = 'Powered by Easy Testimonials';
    badge.className = 'badge';
    container.appendChild(badge);

    // Fetch testimonials from the API
    fetch(`${apiUrl}/${webId}`)
        .then(response => response.json())
        .then(testimonials => {
            testimonials.forEach(testimonial => {
                const testimonialDiv = document.createElement("div");
                testimonialDiv.classList.add("testimonial");
                const date = new Date(testimonial.timestamp).toLocaleDateString(); // Assuming 'createdAt' field exists
                testimonialDiv.innerHTML = `
                    <p>${testimonial.message}</p>
                    <div class="info">
                        <p><strong>By ${testimonial.author}</strong></p>
                        <p><em>${date}</em></p> <!-- Display date/time -->
                    </div>
                `;
                container.appendChild(testimonialDiv);
            });

            // Create and add form after rendering testimonials
            createTestimonialForm(containerId, webId);
        })
        .catch(error => {
            console.error("Error fetching testimonials: ", error);
        });
}

// Function to submit a testimonial
function submitTestimonial(author, message, email, webId) {
    fetch(`${apiUrl}/${webId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, message, email })
    })
        .then(response => response.json())
        .then(() => {
            alert("Thank you for your testimonial!");
            document.querySelector('form').reset(); // Reset the form after submission
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
        <input type="email" id="email" placeholder="Your email" required />
        <textarea id="message" placeholder="Your testimonial" required></textarea>
        <button type="submit">Submit</button>
    `;
    form.onsubmit = (e) => {
        e.preventDefault();
        const author = document.getElementById("author").value;
        const message = document.getElementById("message").value;
        const email = document.getElementById("email").value;
        submitTestimonial(author, message, email, webId);
    };
    container.appendChild(form);
}

// Initialize the widget
function initTestimonialWidget(containerId, webId) {
    injectStyles(); // Inject the styles
    renderTestimonials(containerId, webId); // Render testimonials and add the form afterward
}

// Export the init function to be used in other scripts
window.initTestimonialWidget = initTestimonialWidget;
