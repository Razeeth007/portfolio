const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1158;
canvas.height = 770;

const frameCount = 240;
const currentFrame = index => (
  `frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const airbnb = {
  frame: 0
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw first frame
images[0].onload = () => {
  context.drawImage(images[0], 0, 0);
};

// Update image on scroll
window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const updateImage = index => {
  context.drawImage(images[index - 1], 0, 0);
}

const html = document.documentElement;

/** CHATBOT SYSTEM PROMPT LOGIC **/
const systemPrompt = `You are a professional assistant representing Razeeth Ishmayil. 
Strict Instruction: ONLY answer questions using the following data:
- Name: Razeeth Ishmayil [cite: 1]
- Education: 3rd year B.E. ECE (Grad 2027) [cite: 8]
- Skills: C, C++, Python, MATLAB, Digital Electronics, VLSI Basics [cite: 10, 11, 13]
- Projects: Smart Home Automation (Arduino), Flip-Flop design [cite: 17, 18]
If asked anything outside this, politely say you can only discuss Razeeth's professional profile.`;

// Basic Chat UI Logic
document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    
    if(!input.value) return;

    chatBody.innerHTML += `<p><b>You:</b> ${input.value}</p>`;
    
    // Placeholder for API Call (Integration with Gemini 1.5 Flash)
    // You would fetch(API_URL) here using the systemPrompt above
    chatBody.innerHTML += `<p class="bot-msg"><b>AI:</b> (Connecting to Gemini with Resume Context...)</p>`;
    
    input.value = '';
});
