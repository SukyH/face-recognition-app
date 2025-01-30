import React, { useState } from 'react';
import API from './api'; // Assuming you have API.js for handling requests

const App = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [facesDetected, setFacesDetected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error

    const formData = new FormData();
    formData.append('file', file);  // Appending the file correctly

    // Conditionally set the API URL based on the environment (local or deployed)
    const apiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/upload'  // Local URL for local development
      : 'https://face-recognition-5f1f2.web.app/'; // Firebase URL

    try {
      const response = await API.post(apiUrl, formData); // Sending to backend
      setResult(response.data); // Store the response data
      setFacesDetected(response.data.faces); // Store the number of faces detected
    } catch (err) {
      setError('Failed to upload image or process it. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Face Recognition Web App</h1>

      {/* Image upload form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Upload an Image below:</label>
        <br />
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        <br />
        <button type="submit">Upload Image</button>
      </form>

      {/* Display the result after uploading an image */}
      {result && (
        <div>
          <h2>Detected Faces: {facesDetected}</h2>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
              // Use Firebase or local URL dynamically
              src={process.env.NODE_ENV === 'development'
                ? `http://localhost:5000${result.image_url}`
                : `https://us-central1-your-project-id.cloudfunctions.net/your-function-name/static/uploads/${result.filename}`}
              alt="Uploaded"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {/* Display loading and error messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default App;

