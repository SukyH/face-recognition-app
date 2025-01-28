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
  
    try {
      const response = await API.post('/upload', formData); // Sending to backend
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
              src={`http://localhost:5000${result.image_url}`}  // Display the processed image
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
