# Recipe Genie

This project is an AI-powered ingredient-based recipe suggester.

## Backend

The backend is built with Python and FastAPI.

### To run the backend:

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Create a `.env` file and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key
    ```
4.  Run the application:
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be running at `http://localhost:8000`.

## Frontend

The frontend is a mobile application built with React Native and Expo.

### To run the frontend:

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the application:
    ```bash
    npm start
    ```
    This will open the Expo developer tools in your browser. You can then run the application on an emulator or on your physical device using the Expo Go app.