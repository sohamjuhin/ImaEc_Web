const express = require('express');
const multer = require('multer');
const crypto = require('crypto-js');
const fs = require('fs');

const app = express();
const port = 3000;

// Multer configuration to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle image encryption
app.post('/encrypt', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  const imagePath = req.file.path;
  const imageBuffer = fs.readFileSync(imagePath);
  const password = req.body.password;

  // Encrypt the image buffer using CryptoJS
  const encryptedImage = crypto.AES.encrypt(imageBuffer.toString('base64'), password).toString();

  res.json({ encryptedImage });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
