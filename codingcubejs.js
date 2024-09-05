document.addEventListener("DOMContentLoaded", () => {
    const cube = document.querySelector('.cube');
    let rotateX = 0;
    let rotateY = 0;

    const updateTransform = () => {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    // Mouse wheel event for scrolling (only when the cube is hovered over)
    cube.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            // Scrolling up, rotate up
            rotateX -= 15;  // Slower rotation
        } else if (e.deltaY > 0) {
            // Scrolling down, rotate down
            rotateX += 15;  // Slower rotation
        } else if (e.deltaX < 0) {
            // Scrolling left, rotate left
            rotateY += 15;  // Now rotates left
        } else if (e.deltaX > 0) {
            // Scrolling right, rotate right
            rotateY -= 15;  // Now rotates right
        }
        updateTransform();
        e.preventDefault(); // Prevent default scroll behavior when interacting with the cube
    });

    // Touch events for swiping (only when touching the cube)
    let startX, startY;

    cube.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });

    cube.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) return; // Ignore if more than one finger
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                rotateY -= 15; // Swipe right, rotate right
            } else {
                rotateY += 15; // Swipe left, rotate left
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                rotateX += 15; // Swipe down, rotate down
            } else {
                rotateX -= 15; // Swipe up, rotate up
            }
        }

        updateTransform();
        startX = touch.clientX;
        startY = touch.clientY;
    });
});
