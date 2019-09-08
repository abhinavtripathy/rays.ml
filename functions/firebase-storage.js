const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();
let cityRef = db.collection('data').doc('img');
let getDoc = cityRef.get()
  .then(doc => {
    // eslint-disable-next-line promise/always-return
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log(doc.data().encoded)
    
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });


