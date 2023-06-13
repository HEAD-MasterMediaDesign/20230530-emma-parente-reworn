// Get the necessary elements
const videoPreview = document.getElementById('videoPreview');
const captureButton = document.getElementById('captureButton');



// Access the camera and display the preview
navigator.mediaDevices.getUserMedia({ video:{ facingMode: 'environment'}})
  .then(stream => {
    console.log('hello')
    videoPreview.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing the camera:', error);
  });


captureButton.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = videoPreview.videoWidth;
  canvas.height = videoPreview.videoHeight;
  context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');

  // Send the image data to the server
  fetch('/uploadImage', {
    method: 'POST',
    body: JSON.stringify({ image: imageData }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    // Handle the server response
  })
  .catch(error => {
    // Handle errors
  });
});
