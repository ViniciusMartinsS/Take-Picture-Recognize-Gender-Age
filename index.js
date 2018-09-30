const NodeWebcam = require("node-webcam");
const { promisify } = require("util");
const captureAsync = promisify(NodeWebcam.capture);
const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
const fs = require("fs");

function recognizeGenderAge() {
  const visualRecognition = new VisualRecognitionV3({
    url: "https://gateway.watsonplatform.net/visual-recognition/api",
    version: "2018-03-19",
    iam_apikey: "key" //Colocar iam key do Watson
  });

  const images_file = fs.createReadStream("./foto.jpg");

  const params = {
    images_file: images_file
  };

  visualRecognition.detectFaces(params, function(err, response) {
    if (err) console.log(err);
    else console.log(JSON.stringify(response, null, 2));
  });
}

const opts = {
  callbackReturn: "base64",
  quality: 100
};
(async () => {
  await captureAsync("foto", opts);
  recognizeGenderAge();
})();
