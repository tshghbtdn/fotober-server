// middlewares/authenticateUser.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateUser = (req: Request, res: Response, next: NextFunction):void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "No token provided. Unauthorized." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.locals.userId = (decoded as { userId: string }).userId; // Lưu userId vào res.locals để sử dụng trong các middleware hoặc route sa
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
