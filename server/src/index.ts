import express from 'express';
import dotenv from 'dotenv';
import { router } from './router';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(Number(process.env.PORT), () => {});
console.log(`Server is running at http://localhost:${process.env.PORT}`);
