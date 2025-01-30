const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { PythonShell } = require('python-shell');

admin.initializeApp();

exports.uploadImage = functions.https.onRequest((req, res) => {
  // If the method is POST, handle the image upload
  if (req.method === 'POST') {
    let options = {
      args: [req.body.image],  // Pass the image data to the Python script
    };
    
    // Running your Flask Python script using PythonShell
    PythonShell.run('app.py', options, function (err, result) {
      if (err) {
        console.error('Error during Python execution:', err);
        return res.status(500).send('Error in processing the image');
      }

      console.log(result.toString());
      res.status(200).send(result.toString());  // Send back the result from Flask
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
});
