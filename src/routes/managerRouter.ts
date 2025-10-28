import express from 'express';
import * as ManagerFuns from '../controllers/manager-functions';

const router = express.Router();

router.get('/employees', ManagerFuns.con_getEmployees);

export default router;
