import express from 'express';
import { login, logout, refresh, register } from './auth.controller';

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);

export { authRoutes };