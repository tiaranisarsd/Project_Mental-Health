import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import pgSession from 'connect-pg-simple';
import { PrismaClient } from '@prisma/client';
import TinjauanRoute from "./routes/TinjauanRoute.js";
import UsersRoute from "./routes/UsersRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import EdukasiRoute from "./routes/EdukasiRoute.js";
import JanjiRoute from "./routes/JanjiRoute.js";
dotenv.config();

const app = express();
const port = process.env.APP_PORT;
const prisma = new PrismaClient();
const PGStore = pgSession(session);

app.get('/', (req, res) => {
  res.send('Backend Berjalan!');
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

export default app; 

app.use(cors({
    credentials: true,
    origin: 3000
}));

app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );

app.use(express.json());
app.use(TinjauanRoute);
app.use(UsersRoute);
app.use(AuthRoute);
app.use(EdukasiRoute);
app.use(JanjiRoute);

// app.listen(process.env.APP_PORT, ()=>{
//     console.log('Server up and running...');
// });
