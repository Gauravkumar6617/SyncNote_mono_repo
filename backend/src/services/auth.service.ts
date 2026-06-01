import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/UserRepository";
import { generateToken } from "../utils/jwt";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(data: {
    email: string;
    password: string;
    username: string;
  }) {
    // Check if user already exists
    const existingUser = await this.userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.createUser({
      email: data.email,
      password: hashedPassword,
      username: data.username,
    });
    const token = generateToken(newUser.id);

    return {
      user: newUser,
      token,
    };
  }

  async loginUser(data: { email: string; password: string }) {
    const user = await this.userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = generateToken(user.id);
    return {
      user,
      token,
    };
  }
}
