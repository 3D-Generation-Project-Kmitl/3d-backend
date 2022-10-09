import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import router from './routes';

dotenv.config();

const app: Application = express();
app.set('port', process.env.PORT || 8080);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', router);

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});