import express from 'express';
import * as JobFuns from '../controllers/jobManagement-functions';

const router = express.Router();

router.get('/', JobFuns.con_getJob);
router.get('/cs', JobFuns.con_getJobByCSCode)
router.get('/countToday', JobFuns.con_countTodayJob);

// Thêm route cập nhật output
router.post('/output', JobFuns.con_updateJobOutput);
router.post('/create', JobFuns.con_createJob)
export default router;
