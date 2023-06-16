// Get the necessary elements
const videoPreview = document.getElementById('videoPreview');
const captureButton = document.getElementById('captureButton');
const imageCaptureImageContainer = document.getElementById('image-capture_img-container');
const imageCaptureRetake = document.getElementById('image-capture_retake');
const imageCaptureValidate = document.getElementById('image-capture_validate');



// Access the camera and display the preview
navigator.mediaDevices.getUserMedia({ video:{ facingMode: 'environment'}})
  .then(stream => {
    videoPreview.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing the camera:', error);
  });

/**
 *
 * @type {null | string}
 */
let imageData = null

captureButton.addEventListener('click', () => {
  imageData = getImageFromCamera()

  imageCaptureImageContainer.innerHTML = `
  <img
    src="${imageData}"
    alt=""
  >
  `

  document.body.classList.add('image-capture-is-open')

});

imageCaptureRetake.addEventListener('click', () => {
  imageData = null
  document.body.classList.remove('image-capture-is-open')
})


imageCaptureValidate.addEventListener('click', () => {
  try {
    saveImageInLocalStorage(imageData)
  } catch (e) {
    localStorage.clear()
    saveImageInLocalStorage(imageData)
  }
  goToPage('/gallery.html')
})

function getImageFromCamera() {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = videoPreview.videoWidth
  canvas.height = videoPreview.videoHeight
  context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/png')
}

function saveImageInLocalStorage() {
  localStorage.setItem(
      `image_${localStorage.length}`,
      imageData,
  )
}

/**
 * @location location {string}
 */
function goToPage(location) {
  const url = new URL(`${window.location.protocol}//${window.location.host}${location}`);
  window.location.href = url.href;
}

