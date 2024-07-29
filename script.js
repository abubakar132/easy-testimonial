document.getElementById('widgetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const website = document.getElementById('website').value;
    const webId = document.getElementById('webId').value;
    
    const codeSnippet = `<!-- Start -->\n<div id="testimonial-widget-container"></div>\n <script src="https://abubakar132.github.io/easy-testimonial/testimonial-widget.js"></script>\n<script>\n  initTestimonialWidget('testimonial-widget-container', '${username}');\n</script>\n<!-- End -->`;
    
    document.getElementById('codeSnippet').textContent = codeSnippet;
    document.getElementById('codeSnippetContainer').classList.remove('hidden');
});

document.getElementById('copyButton').addEventListener('click', function() {
    const codeSnippet = document.getElementById('codeSnippet').textContent;
    navigator.clipboard.writeText(codeSnippet).then(() => {
        alert('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});
