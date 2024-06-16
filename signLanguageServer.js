const socketIO = require('socket.io');
const { captureFrame, translateSignLanguage } = require('./signLanguageProcessing'); // Import Sign Language Processing

const io = socketIO();

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Event untuk menerima frame dari client
  socket.on('frame', async (data) => {
    const frame = await decodeBase64(data); // Assuming `decodeBase64` function is used to decode base64-encoded frame data
    const translatedText = await translateSignLanguage(frame); // Use `translateSignLanguage` function to translate the frame into text

    // Kirimkan teks terjemahan ke client
    socket.emit('translation', translatedText);
  });

  // Event ketika client terputus
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Function to decode base64-encoded data (replace with your implementation)
async function decodeBase64(data) {
  // ...
}

// Function to translate sign language frame into text (replace with your implementation)
async function translateSignLanguage(frame) {
  // ...
}

io.listen(3001); // Jalankan server WebSocket pada port 3001
console.log(`Sign Language Server listening at http://localhost:3001`);
