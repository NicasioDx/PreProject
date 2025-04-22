// index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth-routes';  // ใช้ express.Application จากไฟล์ auth-routes.ts
import petsRoutes from "./routes/pets";

const app = express();

app.use(cors());
app.use(bodyParser.json());  // ใช้ body-parser ใน express

app.use(authRoutes);  // ใช้ app ที่ส่งออกมาจาก auth-routes.ts
app.use("/pets", petsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
