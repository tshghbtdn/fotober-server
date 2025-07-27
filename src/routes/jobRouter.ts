import express from 'express';
import * as JobFuns from '../controllers/jobManagement-functions/getJob';
import { con_updateJobOutput } from '../controllers/jobManagement-functions/updateJobOutput';
import { mid_authenticateUser } from '../middlewares/authUser';

const router = express.Router();

router.post('/', JobFuns.con_getJob);

// Thêm route cập nhật output
router.post('/output', mid_authenticateUser, con_updateJobOutput);

export default router;
