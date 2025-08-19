import dotenv from 'dotenv';
dotenv.config();

import app from './app';

//connect to database
import { connectDB } from './config/db';
connectDB();

if (!process.env.PORT){
  throw new Error("Missing PORT in environment variables.");
}

const port = parseInt(process.env.PORT, 10);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}. This is a backend server, so you won't see anything here.`);
});