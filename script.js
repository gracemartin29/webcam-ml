// const mainDiv = document.getElementById("main-div")
// const captureButton = document.getElementById("capture-button")
// const video = document.getElementById("display")
// const canvas = document.getElementById("canvas")

async function displayVideo() {
    // create all html elements that we interact with
    const mainDiv = document.createElement("div")
    const captureButton = document.createElement("button")
    const video = document.createElement("video")
    const canvas = document.createElement("canvas")

    // recreate HTML structure
    mainDiv.appendChild(captureButton);
    mainDiv.appendChild(video);
    document.body.appendChild(mainDiv);
    document.body.appendChild(canvas);

    // add text to button
    captureButton.innerHTML = "Capture"

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

    // remove the whole main div
    mainDiv.remove();

    // return canvas data
    const capturedImage = canvas.toDataURL("image/jpeg")
    return capturedImage
}

displayVideo();