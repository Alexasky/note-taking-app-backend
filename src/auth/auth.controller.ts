import express, { Request, Response } from "express";
import { ALREADY_REGISTERED_ERROR, INTERNAL_SERVER_ERROR, LOGGED_OUT_SUCCESS, REFRESH_TOKEN_INVALID_ERROR, REFRESH_TOKEN_REQUIRED_ERROR } from './auth.constant';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser(name, email, password);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: ALREADY_REGISTERED_ERROR });
  }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
};

export const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: REFRESH_TOKEN_REQUIRED_ERROR });
    return;
  }

  try {
    const { newAccessToken, newRefreshToken } = await authService.refreshAccessToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({ accessToken: newAccessToken })
    return;
  } catch (error) {
    res.status(401).send(REFRESH_TOKEN_INVALID_ERROR)
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if(!refreshToken) {
    res.sendStatus(204);
    return;
  }
  
  try {
    await authService.logoutUser(refreshToken);
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({ message: LOGGED_OUT_SUCCESS });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
}
  

