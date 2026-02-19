const frameCount = 240;
const canvas = document.getElementById("frameCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate frame path
const currentFrame = index => 
    `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

// Preload images
const images = [];
const imageSeq = { frame: 1 };

for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw image to canvas
function drawImage(img) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Maintain aspect ratio
    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// First frame
images[0].onload = () => {
    drawImage(images[0]);
};

// Scroll control
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => {
        drawImage(images[frameIndex]);
    });
});

// Resize fix
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawImage(images[0]);
});
