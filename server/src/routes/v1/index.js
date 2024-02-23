import express from "express";

import { signup, login } from "../../controllers/auth-controller.js";

const router = express.Router();

//auth
router.post("/signup", signup);
router.post("/login", login);

export default router;
