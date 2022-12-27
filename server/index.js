import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import summaryRoutes from './routes/summaryRoutes.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

// app.use('/categorize', );
app.use('/summary', summaryRoutes);

mongoose.set('strictQuery', true);
await mongoose.connect(DB_URL, { useNewUrlParser: true })
.then(app.listen(PORT, () => console.log(`Serving on port ${PORT}`)))
.catch(error => console.log(error));