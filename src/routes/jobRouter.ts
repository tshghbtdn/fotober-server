import express from 'express';
import * as JobFuns from '../controllers/jobManagement-functions/getJob';
import { con_updateJobOutput } from '../controllers/jobManagement-functions/updateJobOutput';
import { mid_authenticateUser } from '../middlewares/authUser';
import { con_countTodayJob } from '../controllers/jobManagement-functions/countTodayJob';
import { con_createJob } from '../controllers/jobManagement-functions/createJob';

const router = express.Router();

router.post('/', JobFuns.con_getJob);

// Thêm route cập nhật output
router.post('/output', mid_authenticateUser, con_updateJobOutput);
router.post('/countToday',con_countTodayJob);
router.post('/create',mid_authenticateUser,con_createJob)
export default router;
