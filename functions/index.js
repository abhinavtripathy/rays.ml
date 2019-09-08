const functions = require('firebase-functions');
const automl = require('@google-cloud/automl');
const fs = require('fs');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();


exports.detectAutoML = functions.firestore
  .document('data/img').onWrite((change, context) => {
    
    let cityRef = db.collection('data').doc('img');
    let getDoc = cityRef.get()

    let base64data = getDoc.data().encoded;

      // Create client for prediction service.
  const client = new automl.PredictionServiceClient();

  const projectId = "pennapps-xx-252213";
  const computeRegion = "us-central1";
  const modelId = "ICN1555294739305209891";
  // const filePath = "./xray.png";

    const scoreThreshold = "0.1";

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Read the file content for prediction.
  // const content = fs.readFileSync(filePath, 'base64');

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

    resultJSON[result.displayName] = result.classification.score * 100;

  });
  console.log(resultJSON);
  
  let docRef = db.collection('data').doc('tags');

  let setAda = docRef.set(resultJSON);

  }
  
  test();

  });

  