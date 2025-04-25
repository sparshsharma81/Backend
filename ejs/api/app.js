// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/generate-image", async (req, res) => {
//   try {
//     const response = await axios.post(
//       "https://ai-text-to-image-generator-flux-free-api.p.rapidapi.com/aaaaaaaaaaaaaaaaaiimagegenerator/quick.php",
//       req.body,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Key": "c296a1adb4msh483412b9524cbc0p142aa4jsne9a4212852a9",
//           "X-RapidAPI-Host": "ai-text-to-image-generator-flux-free-api.p.rapidapi.com"
//         }
//       }
//     );
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(3000, () => console.log("Server running on http://localhost:3000"));


const express = require('expres');
const { GoogleGenAI, Modality } = require('@google/genai');
const fs = require('node:fs');
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(cors());

const ai = new GoogleGenAI({ apiKey: 'YOUR_API_KEY_HERE' }); // 🔁 Replace with your actual Gemini API key

// Serve HTML directly
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Gemini Image Generator</title>
      <style>
        body { font-family: sans-serif; text-align: center; margin-top: 50px; }
        #loading { display: none; color: green; }
        #cancelBtn { display: none; margin-left: 10px; }
        img { max-width: 90%; margin-top: 20px; display: none; }
      </style>
    </head>
    <body>
      <h1>Generate a Futuristic Flying Pig</h1>
      <button id="generateBtn">Generate Image</button>
      <button id="cancelBtn">Cancel</button>
      <p id="loading">Generating... Please wait.</p>
      <img id="resultImage" src="" />

      <script>
        let controller = null;

        document.getElementById('generateBtn').addEventListener('click', async () => {
          document.getElementById('loading').style.display = 'block';
          document.getElementById('cancelBtn').style.display = 'inline';
          document.getElementById('resultImage').style.display = 'none';
          controller = new AbortController();

          try {
            const response = await fetch('/generate-image', { signal: controller.signal });
            const data = await response.json();
            if (data.success) {
              document.getElementById('resultImage').src = data.image;
              document.getElementById('resultImage').style.display = 'block';
            } else {
              alert(data.message);
            }
          } catch (err) {
            if (err.name === 'AbortError') {
              alert('Image generation cancelled.');
            } else {
              alert('Something went wrong.');
            }
          } finally {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('cancelBtn').style.display = 'none';
          }
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
          if (controller) controller.abort();
        });
      </script>
    </body>
    </html>
  `);
});

// Image generation route
app.get('/generate-image', async (req, res) => {
  try {
    const contents = "Hi, can you create a 3d rendered image of a pig with wings and a top hat flying over a happy futuristic scifi city with lots of greenery?";

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        const imagePath = path.join(__dirname, 'generated.png');
        fs.writeFileSync(imagePath, buffer);
        return res.json({ success: true, image: '/generated.png' });
      }
    }

    res.status(500).json({ success: false, message: 'No image generated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error generating image' });
  }
});

// Serve generated image
app.use('/generated.png', (req, res) => {
  const imagePath = path.join(__dirname, 'generated.png');
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('Image not found');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
