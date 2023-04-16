import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { registerUser, loginUser, verifyJWT } from './controllers/auth.js';
import summaryRoutes from './routes/summaryRoutes.js';
import plaidRoutes from './routes/plaidRoutes.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

app.post('/register', registerUser);
app.post('/login', loginUser);

app.use('/summary', verifyJWT, summaryRoutes);
app.use('/plaid', verifyJWT, plaidRoutes);

mongoose.set('strictQuery', true);
await mongoose.connect(DB_URL, { useNewUrlParser: true })
.then(app.listen(PORT, () => console.log(`Serving on port ${PORT}`)))
.catch(error => console.log(error));