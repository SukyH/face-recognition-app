from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests
import os
from werkzeug.utils import secure_filename
from PIL import Image
import face_recognition
import cv2

app = Flask(__name__)

# Enable CORS for all domains
CORS(app)  # This will allow requests from any origin, including your React app

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Check if the uploaded file has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Resize the image using PIL
        with Image.open(filepath) as img:
            original_width, original_height = img.size
            img.thumbnail((800, 800))  # Resize the image for better performance
            img.save(filepath)  # Save the resized image back

        # Perform face recognition
        image = face_recognition.load_image_file(filepath)
        face_locations = face_recognition.face_locations(image)
        num_faces = len(face_locations)

        if num_faces == 0:
            return jsonify({'error': 'No faces detected'}), 200

        # Adjust face locations for the resized image
        resized_width, resized_height = img.size
        scale = original_width / resized_width

        # Scale the face locations
        adjusted_face_locations = [
            [int(top * scale), int(right * scale), int(bottom * scale), int(left * scale)]
            for (top, right, bottom, left) in face_locations
        ]

        # Draw rectangles around faces in the image
        img_cv = cv2.imread(filepath)
        for (top, right, bottom, left) in adjusted_face_locations:
            cv2.rectangle(img_cv, (left, top), (right, bottom), (0, 255, 0), 2)

        # Save the image with rectangles
        cv2.imwrite(filepath, img_cv)

        return jsonify({
            'faces': num_faces,
            'image_url': f'/static/uploads/{filename}',
            'face_locations': adjusted_face_locations
        })

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(debug=True)



