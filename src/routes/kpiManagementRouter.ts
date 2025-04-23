import express, { Request, Response } from 'express';
import { showKPI } from '../controllers/user-management-functions';

const app = express.Router();

app.get('/show', showKPI);


export default app;
