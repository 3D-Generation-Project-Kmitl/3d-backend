import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes';
import https from 'https';
import fs from 'fs';


dotenv.config();

declare global {
    namespace Express {
        interface Request {
            userId: number
        }
    }
}

const server: Application = express();

server.set('port', process.env.PORT || 8080);

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use('/uploads', express.static('uploads'));

server.use(cors({
    origin: true,
    credentials: true,
}));

server.use('/api/health-check', (req, res) => {
    res.send(`I'm up and running on v1.0.0`);
});
server.use('/api', router);

server.listen(server.get('port'), () => {
    console.log(`Server is running on port ${server.get('port')}`);
});
