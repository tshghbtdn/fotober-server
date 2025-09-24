//File: src/controllers/authenticate-functions/logoutUser.ts
import { Request, Response } from "express";

export const con_logoutUser = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
        console.error(err); // Log the error for debugging
    }
}