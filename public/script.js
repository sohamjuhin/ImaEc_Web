document.getElementById('encryptButton').addEventListener('click', async () => {
  const imageInput = document.getElementById('imageInput');
  const passwordInput = document.getElementById('passwordInput');
  const resultDiv = document.getElementById('result');

  if (!imageInput.files[0] || !passwordInput.value) {
    resultDiv.textContent = 'Please select an image and enter a password.';
    return;
  }

  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('password', passwordInput.value);

  const response = await fetch('/encrypt', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (data.encryptedImage) {
    resultDiv.textContent = 'Image encrypted successfully.';
    console.log('Encrypted Image:', data.encryptedImage);
  } else {
    resultDiv.textContent = 'Error encrypting the image.';
  }
});
