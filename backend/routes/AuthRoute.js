import express from "express";
import {Login, logOut, Me} from "../controllers/AuthController.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logOut', logOut);

export default router;