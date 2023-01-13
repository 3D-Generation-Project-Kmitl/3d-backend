import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import logger from './utils/logger';
import { errorHandler } from './middleware/error';


dotenv.config();

const server: Application = express();

server.use(cors({
    origin: true,
    credentials: true,
}));

server.set('port', process.env.PORT || 8080);

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use('/uploads', express.static('uploads'));

server.use('/api/health-check', (req, res) => {
    res.send(`I'm up and running on v1.0.0`);
});
server.use('/api', router);

server.use(errorHandler);

server.listen(server.get('port'), () => {
    logger.info(`Server is running on port ${server.get('port')}`);
});
