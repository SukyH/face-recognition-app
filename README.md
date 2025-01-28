Face Recognition Web App

This project is a Face Recognition Web App built using React for the frontend and Flask for the backend. It allows users to upload images and detect faces in them using machine learning techniques. The app uses OpenCV for image manipulation and will incorporate Pytorch for deep learning-based face detection.

👩🏻‍💻 Features

    Image Upload: Users can upload images to detect faces.
    Face Detection: The app detects faces in uploaded images and draws rectangles around them.
    Deep Learning Model: Initially, traditional computer vision methods (OpenCV) are used, but the project can be extended to include deep learning-based face detection (e.g., MobileNetV2 or other pre-trained models).

💭Technologies Used

    Frontend: Built with React to create an interactive user interface, enabling image uploads and displaying results.
    Backend: Built with Flask to handle image uploads and process face detection using computer vision techniques.
    Face Detection: Used OpenCV (initial) for the face recognition models , plan to incorporate Pytorch  for deep learning(future integration)
    API Requests: Axios
    Deploying app: Deployed the front-end on Firebase Hosting and integrated the back-end with Flask.
    Deep learning and other models : Firebase function
    
    
⚙️ Installation & Running 

Clone the Repository

Clone this repository to your local machine,compile the files and run the application:
git clone https://github.com/SukyH/face-recognition-app.git
OR
Visit the Hosting URL: https://face-recognition-5f1f2.web.app

✨ Improvements

    Deep Learning Integration: The current face detection model can be upgraded to use deep learning (e.g., TensorFlow or PyTorch) for better accuracy and performance in detecting faces.

    Error Handling: Enhance error handling to provide better feedback in case of failed uploads or processing errors.

    Scalability: The back-end can be scaled using serverless cloud functions (e.g., Firebase Cloud Functions), allowing for more efficient image processing and reduced server load.

    User Authentication: Implement user authentication to allow users to track their uploaded images and results.

   


