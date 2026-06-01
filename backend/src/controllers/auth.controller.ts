import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/UserRepository";

const authService = new AuthService(new UserRepository());

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { user, token } = await authService.registerUser(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    user,
  });
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { user, token } = await authService.loginUser(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    user,
  });
};

// LOGOUT
export const logout = async (_: Request, res: Response) => {
  res.clearCookie("token");

  res.json({ message: "Logged out successfully" });
};
