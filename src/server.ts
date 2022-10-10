import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import router from './routes';

dotenv.config();

const server: Application = express();
server.set('port', process.env.PORT || 8080);

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use('/api', router);

server.listen(server.get('port'), () => {
    console.log(`Server is running on port ${server.get('port')}`);
});