// Get the necessary elements
const videoPreview = document.getElementById('videoPreview');
const captureButton = document.getElementById('captureButton');



// Access the camera and display the preview
navigator.mediaDevices.getUserMedia({ video:{ facingMode: 'environment'}})
  .then(stream => {
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

  try {
    saveImageInLocalStorage(imageData)
  } catch (e) {
    localStorage.clear()
    saveImageInLocalStorage(imageData)
  }

});

function saveImageInLocalStorage(imageData) {
  localStorage.setItem(
      `image_${localStorage.length}`,
      imageData,
  )
}

