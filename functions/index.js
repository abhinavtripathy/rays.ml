// const functions = require('firebase-functions');


const automl = require('@google-cloud/automl');
const fs = require('fs');

  // Create client for prediction service.
  const client = new automl.PredictionServiceClient();

  const projectId = "pennapps-xx-252213";
  const computeRegion = "us-central1";
  const modelId = "ICN7679781988763224795";
  const filePath = "./xray.png";

    const scoreThreshold = "0.1";

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Read the file content for prediction.
  const content = fs.readFileSync(filePath, 'base64');

  const params = {};

  if (scoreThreshold) {
    params.score_threshold = scoreThreshold;
  }

  // Set the payload by giving the content and type of the file.
  const payload = {};
  payload.image = {imageBytes: content};

  // params is additional domain-specific parameters.
  // currently there is no additional parameters supported.
  
  async function test() {
    const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: params,
      });
      let resultJSON = {}
    console.log(`Prediction results:`);
    response.payload.forEach(result => {

    resultJSON[result.displayName] = result.classification.score;
    console.log(resultJSON);
  });
  }
  
  test();
  

