import express from 'express';
import cors from 'cors';

const app = express();

// Cấu hình CORS cho phép các origin từ frontend khác nhau
app.use(cors({
    origin: (origin: string | undefined, callback) => {
        // Bạn có thể thêm nhiều địa chỉ IP hoặc domains ở đây
        const allowedOrigins = [ 'http://192.168.1.135:3000']; 
        if ((origin && allowedOrigins.includes(origin)) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy violation: Origin not allowed'));
        }
    },
    credentials: true,  // Nếu bạn muốn gửi cookie
}));

app.use(express.json());

// Các router khác
import authenticationRouter from './routes/authenticationRouter';
import jobManagementRouter from './routes/jobManagementRouter';
import taskManagementRouter from './routes/taskManagementRouter';

//Mounding routers
app.use('/authentication', authenticationRouter);
app.use('/job', jobManagementRouter);
app.use('/task', taskManagementRouter);

export default app;
