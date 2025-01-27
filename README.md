Face Recognition Web App

This project is a Face Recognition Web App built using React for the frontend and Flask for the backend. It allows users to upload images and detect faces in them using machine learning techniques. The app uses OpenCV for image manipulation and TensorFlow (or a similar library) for deep learning-based face detection.
Features

    Image Upload: Users can upload images to detect faces.
    Face Detection: The app detects faces in uploaded images and draws rectangles around them.
    Deep Learning Model: Initially, traditional computer vision methods (OpenCV) are used, but the project can be extended to include deep learning-based face detection (e.g., MobileNetV2 or other pre-trained models).

Technologies Used

    Frontend: React
    Backend: Flask
    Face Detection: OpenCV (initial), TensorFlow (future integration)
    Image Processing: OpenCV, Pillow
    API Requests: Axios
    Cloud: Optional, can be extended to use cloud services like Azure Face API or AWS Rekognition for enhanced face recognition capabilities.
