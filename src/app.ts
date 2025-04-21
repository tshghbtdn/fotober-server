import express from 'express';

const app = express();
app.use(express.json());

// import { verifyPostRequest } from './middlewares/verifyPostRequest';
// app.post("*", verifyPostRequest);

//Import routers
import authenticationRouter from './routes/authenticationRouter';

//Mounding routers
app.use('/authentication', authenticationRouter);

export default app;