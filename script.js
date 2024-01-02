/* INDEX PAGE */

var professions = ['engineer ⚙️', 'builder 🔨', 'designer 🧐','researcher 🌎'];
        var index = 0;
        setInterval(function() {
            document.getElementById('dynamic-text').textContent = professions[index];
            index = (index + 1) % professions.length;
        }, 1000); // Change every 1000 milliseconds (3 seconds)

//////////////////////////////////////////

/* PROJECTS PAGE */
document.addEventListener('DOMContentLoaded', (event) => {
    // Get all the project links
    const projectLinks = document.querySelectorAll('.project-link');

    // Add mouseover and mouseout event listeners to each link
    projectLinks.forEach(link => {
        link.addEventListener('mouseover', function(e) {
            // Get the corresponding image display for this link
            const imgDisplay = this.parentNode.querySelector('.image-display');
            imgDisplay.style.display = 'block'; // Show the image

            // Move the image to follow the cursor
            const xOffset = 20; // How far to the right of the cursor the image should appear
            const yOffset = 0; // How far below the cursor the image should appear

            imgDisplay.style.left = (e.pageX + xOffset) + 'px';
            imgDisplay.style.top = (e.pageY + yOffset) + 'px';
        });

        link.addEventListener('mousemove', function(e) {
            // Get the corresponding image display for this link
            const imgDisplay = this.parentNode.querySelector('.image-display');

            // Update the position of the image as the cursor moves
            const xOffset = 300; // How far to the right of the cursor the image should appear
            const yOffset = -100; // How far below the cursor the image should appear

            imgDisplay.style.left = (e.pageX + xOffset) + 'px';
            imgDisplay.style.top = (e.pageY + yOffset) + 'px';
        });

        link.addEventListener('mouseout', function() {
            // Hide the image when the cursor leaves the link
            const imgDisplay = this.parentNode.querySelector('.image-display');
            imgDisplay.style.display = 'none';
        });
    });
});


