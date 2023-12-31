import express from 'express';
import cors from 'cors';
import rootRoute from './routes/rootRoute.js';

const app = express();

//midle ware định vị thư mục tài nguyên
app.use(express.static("."));


// Use CORS middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Mount your routes
app.use( rootRoute);

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

