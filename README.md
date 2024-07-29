# Easy Testimonial Widget

Welcome to the Easy Testimonial Widget! This widget allows you to effortlessly display and manage testimonials on your website. Below you'll find instructions on how to integrate and use the widget.

## Features

- **Easy Integration**: Add the widget to your website with just a few lines of code.
- **Customizable**: Adjust the widget’s appearance and settings to match your site’s design.
- **User-Friendly**: Allows visitors to submit testimonials directly from the widget.

## Getting Started

Follow these steps to add the Easy Testimonial Widget to your website:

### 1. Add the Embed Code

Copy and paste the following code into your website’s HTML where you want the widget to appear:

```html
<!-- Start -->
<script src="https://abubakar132.github.io/easy-testimonial/testimonial-widget.js"></script>
<div id="testimonial-widget-container"></div>
<script>
window.onload = function() {
    initTestimonialWidget('testimonial-widget-container', 'web_id_here');
};
</script>
<!-- End -->
```

### 2. Replace web_id_here
In the code snippet, replace 'web_id_here' with the Web ID that corresponds to your specific widget instance. This ensures that the widget pulls and displays testimonials for the correct site.

### 3. Customize Your Widget
You can customize the appearance of the widget by editing the CSS in the testimonial-widget.js file or by using custom CSS in your website’s stylesheet.

## How It Works
Load the Script: The widget script is loaded from the provided URL.
Create the Widget Container: A <div> element with the ID testimonial-widget-container is used as the container for the widget.
Initialize the Widget: The initTestimonialWidget function initializes the widget with the specified Web ID.
