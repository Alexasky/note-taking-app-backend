import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, TOKEN_INVALID_ERROR, TOKEN_PROVIDED_ERROR } from '../auth.constant';


interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authGuard = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: TOKEN_PROVIDED_ERROR });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY) as { userId: string };
    req.user = { userId: decoded.userId }; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: TOKEN_INVALID_ERROR });
    return;
  }
};
