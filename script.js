document.addEventListener("DOMContentLoaded", function () {
  const videoUrlInput = document.getElementById("video-url");
  const videoElement = document.getElementById("video");
  const captionDisplay = document.getElementById("caption-display");
  const loadVideoButton = document.getElementById("load-video");

  function loadVideo() {
    const videoUrl = videoUrlInput.value;
    const captionsText = document.getElementById("captions").value;

    videoElement.src = videoUrl;
    const captions = parseCaptions(captionsText);

    videoElement.addEventListener("timeupdate", function () {
      const currentTime = videoElement.currentTime;
      const currentCaption = getCaptionForTime(captions, currentTime);
      captionDisplay.innerText = currentCaption || "";
    });
  }

  loadVideoButton.addEventListener("click", loadVideo);

  loadVideo();
});

function parseCaptions(captionsText) {
  const lines = captionsText.split("\n");
  return lines.map((line) => {
    const [time, ...captionParts] = line.split(" ");
    const caption = captionParts.join(" ");
    const [hours, minutes, seconds] = time.split(":").map(parseFloat);
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    return { time: timeInSeconds, caption };
  });
}

function getCaptionForTime(captions, time) {
  for (let i = 0; i < captions.length; i++) {
    if (
      time >= captions[i].time &&
      (!captions[i + 1] || time < captions[i + 1].time)
    ) {
      return captions[i].caption;
    }
  }
  return "";
}
