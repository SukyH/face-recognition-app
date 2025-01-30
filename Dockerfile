# Use a Python base image with system dependencies
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Install system dependencies for dlib
RUN apt-get update && apt-get install -y \
    cmake \
    libboost-all-dev \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy the application files to the container
COPY . /app

# Install required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5000 (or the one your app runs on)
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
