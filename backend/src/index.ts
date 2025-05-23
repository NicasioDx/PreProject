// index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth-routes';  // ใช้ express.Application จากไฟล์ auth-routes.ts

import petsRoutes from "./routes/pets";

import appointmentRoutes from './routes/appointment-routes';



const app = express();

app.use(cors());
app.use(bodyParser.json());  // ใช้ body-parser ใน express



app.use("/pets", petsRoutes);
app.use('/api/auth', authRoutes);
app.use(appointmentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log("Server running at http://0.0.0.0:5000");
});

