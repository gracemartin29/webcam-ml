const mainDiv = document.getElementById("main-div")
const captureButton = document.getElementById("capture-button")
const video = document.getElementById("display")
const canvas = document.getElementById("canvas")

async function displayVideo() {
    // ask user for permission to access webcam and store input on stream
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // display whats coming from the webcam
    video.srcObject = stream;
    await video.play();

    // pause execution until capture button has been clicked
    await new Promise((resolve) => captureButton.onclick = resolve);

    // save the image in the canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // draw video onto canvas object
    canvas.getContext('2d').drawImage(video, 0, 0);

    // stop video from streaming
    stream.getVideoTracks()[0].stop();
}

displayVideo();