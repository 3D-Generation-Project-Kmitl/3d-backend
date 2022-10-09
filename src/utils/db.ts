import { Pool } from 'pg';
import dbConfig from '../configs/db';

const pool = new Pool(dbConfig);

export default {
    async query(text: string, params: any) {
        try {
            const start = Date.now();
            const res = await pool.query(text, params);
            const duration = Date.now() - start;
            console.log('executed query', { text, duration, rows: res.rowCount });
            return res;
        }
        catch (err) {
            console.log(err);
        }
    }
};
