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

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});

module.exports = app; // Penting untuk Vercel

app.use(cors({
    credentials: true,
    origin: 'https://mental-health1.netlify.app'
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
