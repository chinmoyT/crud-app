# CRUD app

## Overview
This project consists of a frontend and a backend, both of which need to be set up independently.

## Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   - Create a `.env` file in the `backend` directory.
   - Add the following line, replacing `<your_mongo_uri>` with your actual MongoDB connection string:
     ```
     MONGODB_URI=<your_mongo_uri>
     ```

4. Ensure your Node.js version is greater than 16:
   ```bash
   node -v
   ```
   If the version is below 16, update Node.js.

5. Start the backend server:
   ```bash
   npm start
   ```

## Additional Notes
- Make sure both frontend and backend servers are running simultaneously for the project to work.


