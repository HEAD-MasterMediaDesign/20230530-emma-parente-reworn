// Get the necessary elements
const videoPreview = document.getElementById('videoPreview');
const captureButton = document.getElementById('captureButton');
const analyzingMessage = document.getElementById('analyzing');
const retryMessage = document.getElementById('retry');
const serverMessage = document.getElementById('serverfail');
const imagePreview = document.getElementById('imagePreview');
const clothTypeMessage = document.getElementById('clothtype');
let capturedImages = [];

// Access the camera and display the preview
navigator.mediaDevices.getUserMedia({ video:{ facingMode: 'environment'}})
  .then(stream => {
    videoPreview.srcObject = stream; 
  })
  .catch(error => {
    console.error('Error accessing the camera:', error);
  });

// Capture and store the image when the button is clicked
captureButton.addEventListener('click', () => {

  startAnalysis();

  //const canvas = document.createElement('canvas');
  const canvas = imagePreview;
  const context = canvas.getContext('2d');

  // Set the canvas dimensions to match the video feed
  canvas.width = videoPreview.videoWidth;
  canvas.height = videoPreview.videoHeight;

  // Draw the current video frame on the canvas
  context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);

  // Convert the canvas content to a data URL representing the captured image
  const imageUrl = canvas.toDataURL('image/png');

  // Store the image in the capturedImages array
  capturedImages.push(imageUrl);

  axios({
    method: "POST",
    url: "https://outline.roboflow.com/wardrobe-detector/3",
    params: {
        api_key: "3cOzkL0p6aYKJ9hgntqE"
    },
    data: imageUrl,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  // si ça fonctionne
  .then(function(response) {
    //console.log(response.data);
    processResult(response);
  })  
    // si y'a une erreur
  .catch(function(error) {
    console.log(error.message);
    serverFailed();
  });

});


function serverFailed(){
  analyzingMessage.classList.add('hidden');
  captureButton.classList.remove('hidden');
  retryMessage.classList.add('hidden');
  serverMessage.classList.remove('hidden');
  videoPreview.classList.remove('hidden');
  imagePreview.classList.add('hidden');
}


function startAnalysis(){
  analyzingMessage.classList.remove('hidden');
  captureButton.classList.add('hidden');
  retryMessage.classList.add('hidden');
  serverMessage.classList.add('hidden');
  videoPreview.classList.add('hidden');
  imagePreview.classList.remove('hidden');
}

function redoCamera(){
  analyzingMessage.classList.add('hidden');
  captureButton.classList.remove('hidden');
  retryMessage.classList.remove('hidden');
  serverMessage.classList.add('hidden');
  videoPreview.classList.remove('hidden');
  imagePreview.classList.add('hidden');
}

function processResult(response){

  const data = response.data;

  //si pas eu d'objet trouvé 
  if(data.predictions.length == 0){
    //afficher pop up retake
    redoCamera();
  }
  else{
    foundCloth(data);
  }

}


function foundCloth(data){

  let prediction = data.predictions[0];
  clothTypeMessage.textContent = prediction.class;
  console.log(data.predictions);
  // draw blob thing
  let points = prediction.points;

  const context = imagePreview.getContext('2d');

  // draw into context
  let cpath = `M${points[0].x},${points[0].y}`;
  for(let i=1; i<points.length; i++) {
    cpath += `S${points[i-1].x},${points[i-1].y}, ${points[i].x},${points[i].y}`;
  }
  cpath += "Z";
  let p = new Path2D(cpath);
  context.clearRect(0, 0, imagePreview.width, imagePreview.height);
  context.fillStyle = "rgb(255, 0, 255)";
  context.fill(p);

}