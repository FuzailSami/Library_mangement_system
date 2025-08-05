# Backend Library Management System

## Overview
This is the backend part of the Library Management System project. It is built using Node.js and Express, and it connects to a MongoDB database using Mongoose.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- A `.env` file with the following variable:
  - `MONGODB_URI`: Your MongoDB connection string.

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd library-management-system/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the backend server, run:
```
npm start
```
The server will start on the specified port (default is 5000).

### API Endpoints
The backend exposes several API endpoints for managing library resources. Refer to the routes defined in `src/routes/index.js` for detailed information on available endpoints.

### Testing
To run tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.